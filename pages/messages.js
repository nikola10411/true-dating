import { Box, Button, Container, TextField, Typography, CircularProgress } from "@mui/material";
import { green } from '@mui/material/colors';
import firebaseApp from "../src/configs/firebase";
import { useAuth } from '../src/contexts/AuthProvider';
import { where, addDoc, onSnapshot, orderBy, limitToLast, query, collection, getDocs, getFirestore } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from "next/router";

import { Send } from '@mui/icons-material';
import { readMessages } from '../src/services/message';
import { getServerTimestamp } from "../src/utils/firestoreTimestamp";

export default function Messages(props) {
    const { user } = useAuth();
    const router = useRouter();
    const messageContainerRef = useRef(null);
    const messagesRef = collection(getFirestore(firebaseApp), "messages");


    const [currentMessagingUser, setCurrentMessagingUser] = useState(null)
    useEffect(() => {
        const getUser = async () => {
            const messagingUser = JSON.parse(router.query.data);
            setCurrentMessagingUser(messagingUser);

            const firebaseQuery = query(messagesRef, where("room", "in", [`${messagingUser.email}+${user.email}`, `${user.email}+${messagingUser.email}`]), orderBy("createdAt"), limitToLast(100));
            setLoading(true);
            const querySnapshot = await getDocs(firebaseQuery);
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages)
            setLoading(false);


            const unsubscribe = onSnapshot(firebaseQuery, (querySnapshot) => {
                const messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id})
                });
                setMessages(messages)
            });
        }
        getUser()
    }, [router.query]);



    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(currentMessagingUser);
        if (currentMessagingUser && !currentMessagingUser.email) {
            //return history.push(routes.home);
        }
    }, [currentMessagingUser]);

    useEffect(() => {
        const messageContainerElement = messageContainerRef.current;

        if (!loading && messages.length && messageContainerElement?.scrollTop === 0) {
            messageContainerElement?.scrollTo({
                top: messageContainerElement?.scrollHeight,
                behavior: 'smooth',
            });
            readMessages(messages, user);
        }
    }, [loading, messages.length]);

    const handleMessageSubmit = async (e) => {
        e.preventDefault();

        const messageInput = e.target.messageInput;
        const { email, photoURL, firstName, lastName } = user;
        const createdAt = getServerTimestamp()

        const newMessage = {
            user: { firstName, lastName, email, photoURL },
            createdAt,
            text: messageInput.value,
            room: messages[0]?.room || `${user.email}+${currentMessagingUser.email}`,
            from: user.email,
            to: currentMessagingUser.email,
            toName: currentMessagingUser.firstName,
            read: false,
            members: [user.email, currentMessagingUser.email]
        };

        messageInput.value = '';
        await addDoc(messagesRef, newMessage);
        messageContainerRef.current?.scrollTo({
            top: messageContainerRef.current?.scrollHeight,
            behavior: 'smooth',
        });
    };

    if (!currentMessagingUser) {
        return (
            <Box />
        );
    }

    return (
        <Box py={6}>
            <Container>
                <Box sx={(theme) => ({
                    borderRadius: theme.shape.borderRadius,
                    width: '100%',
                })}  >
                    <Box display='flex' alignItems='center' sx={(theme) => ({
                        paddingBottom: theme.spacing(1),
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    })} >
                        <Box
                            style={{
                                backgroundImage: `url(${currentMessagingUser.photoURL ||
                                    (currentMessagingUser.gender === 'M'
                                        ? 'https://media.istockphoto.com/vectors/default-placeholder-man-vector-id844000458?'
                                        : 'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg')
                                    })`,
                            }}
                            sx={(theme) => ({
                                width: theme.spacing(6),
                                height: theme.spacing(6),
                                borderRadius: theme.spacing(3),
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                marginRight: theme.spacing(2),
                            })}
                        />
                        <Box>{currentMessagingUser.firstName}</Box>
                    </Box>
                    <Box sx={(theme) => ({
                        overflowY: 'auto',
                        maxHeight: '60vh',
                        minHeight: '40vh',
                    })} pt={1} ref={messageContainerRef}>
                        {loading ? (
                            <Box display='flex' justifyContent='center' alignItems='center' minHeight='inherit'>
                                <CircularProgress color='primary' />
                            </Box>
                        ) : (
                            messages.map((m) => (
                                <Box
                                    key={m.id}
                                    sx={(theme) => ({
                                        width: 'fit-content',
                                        maxWidth: '70%',
                                        padding: theme.spacing(1),
                                        borderRadius: theme.shape.borderRadius,
                                        marginTop: theme.spacing(0.2),
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: m.user.email === user.email ? ({ matchType }) => (matchType === 1 ? theme.palette.primary.main : green[500]) : theme.palette.grey[700],
                                        color: m.user.email === user.email ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText,
                                        marginLeft: m.user.email === user.email ? 'auto' : 'unset',
                                    })}
                                >
                                    <Box sx={(theme) => ({
                                        overflowWrap: 'break-word',
                                    })} >{m.text}</Box>
                                </Box>
                            ))
                        )}

                        {!loading && messages.length === 0 && (
                            <Box
                                textAlign='center'
                                display='flex'
                                minHeight='inherit'
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Typography variant='body1'>
                                    This is your first conversation with <br /> <strong>{currentMessagingUser.firstName}</strong>
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box mt={2}>
                        <form onSubmit={handleMessageSubmit}>
                            <TextField
                                name='messageInput'
                                variant='outlined'
                                fullWidth
                                placeholder='Enter message'
                                sx={(theme) => ({
                                    '& .MuiOutlinedInput-root:focus .MuiOutlinedInput-notchedOutline': {
                                        borderColor: ({ matchType }) => (matchType === 1 ? theme.palette.primary.main : green[500]),
                                    },
                                })}
                                required
                            />
                            <Box py={1} />
                            <Button
                                type='submit'
                                fullWidth
                                color='primary'
                                variant='contained'
                                endIcon={<Send />}
                            >
                                Send
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}