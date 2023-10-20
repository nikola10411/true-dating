
import { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Container } from "@mui/material";
import { useAuth } from '../src/contexts/AuthProvider';
import { getUserMatches } from '../src/services/match';
import { getUsersByEmail } from '../src/services/user';
import firebaseApp from "../src/configs/firebase";
import { where, getDocs, query, collection, getFirestore } from 'firebase/firestore';
import PageSpinner from "../src/components/PageSpinner";
import { Chat } from '@mui/icons-material';
import { routes } from "../src/routes";
import { useRouter } from "next/router";
import { COLORS } from "../src/theme";

const MyMessages = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [syncing, setSyncing] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState([]);

    useEffect(() => {
        const loadMatches = async () => {
            const currMatches = await getUserMatches(user.email)
            setSyncing(false);
            if (!currMatches.length) return
            setMatches(currMatches)
        }
        
        if (user) {
            setSyncing(true)
            loadMatches()
        }
    }, [user, user.email])

    useEffect(() => {
        if (matches.length > 0) {
            let matchedUsers = [];
            for (const match of matches) {
                const otherUser = match.users.filter(matchUser => matchUser !== user.email)
                matchedUsers = matchedUsers.concat(otherUser);
            }
            const uniqueMatchedUsers = matchedUsers.filter((matchedUser, index, self) => self.indexOf(matchedUser) === index)
            if (uniqueMatchedUsers.length > 0) {
                getUsersByEmail(uniqueMatchedUsers).then((docs) => {
                    setUsers(docs.map(doc => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    }))
                })
            }
        }
    }, [matches, user.email])

    useEffect(() => {
        async function getMessagedUsers () {
            const customUsers = [];
            const firestore = getFirestore(firebaseApp);
            for (const customUser of users) {
                const q = query(collection(firestore, "messages"), where("room", "in", [`${customUser.email}+${user.email}`, `${user.email}+${customUser.email}`]));
                const querySnapshot = await getDocs(q);
                console.log(customUser.email);
                if (querySnapshot.empty === false) {
                    customUsers.push(customUser);
                }
            }
            setConnectedUsers(customUsers);
            setSyncing(false)
        }

        if (users.length > 0) {
            setSyncing(true);
            getMessagedUsers()
        }
    }, [users, user.email])

    if (syncing) {
        return <PageSpinner />
    }

    console.log(connectedUsers);

    return (
        <Container>
            <Box mt={8}>
            {
                connectedUsers && connectedUsers.length > 0 && connectedUsers.map(messagedUser => (
                    <Box mb={5} display="flex" alignItems="center" key={messagedUser.id} sx={(theme) => ({
                        backgroundColor: COLORS.lightGrey,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: theme.shape.borderRadius,
                        marginBottom: theme.spacing(2),
                        padding: theme.spacing(2),
                    })}>
                        <Box
                        sx={(theme) => ({
                            minWidth: 80,
                            width: 80,
                            height: 80,
                            borderRadius: 50,
                            boxShadow: theme.shadows[2],
                            marginRight: theme.spacing(2),
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        })}
                        style={{
                            backgroundImage: `url(${
                            messagedUser.photoURL ||
                            (messagedUser.gender === 'M'
                                ? 'https://media.istockphoto.com/vectors/default-placeholder-man-vector-id844000458?'
                                : 'https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133351974-stock-illustration-default-placeholder-woman.jpg')
                            })`,
                        }}
                        />
                        <Typography variant='h6' sx={(theme) => ({
                                width: '100%',
                                maxWidth: 200,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                        })}>
                            {messagedUser.firstName}
                        </Typography>
                        <Box ml="auto">
                            <IconButton onClick={() => router.push({ pathname: routes.messages,  query: { data: JSON.stringify(messagedUser) }}, routes.messages)}>
                                <Chat color="primary" />
                            </IconButton>
                        </Box>
                    </Box>
                ))
            }
            {
                (!connectedUsers || connectedUsers.length === 0) && (
                    <Box mb={5} display="flex" alignItems="center" justifyContent="center">
                        <Typography>You currently have no message history</Typography>
                    </Box>
                )
            }
            </Box>
        </Container>
    )
}

export default MyMessages;