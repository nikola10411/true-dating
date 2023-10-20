import { routes } from '../routes';
import commonPhraseMarkup from '../services/Markups/Blogs/commonPhrasesMarkup';
import matureDatingMarkup from '../services/Markups/Services/matureDatingMarkup';
import christianDatingMarkup from './Markups/Services/christianDatingMarkup';
import eventsMarkup from './Markups/Services/eventsMarkup';
import gayDatingMarkup from './Markups/Services/gayDatingMarkup';

const DEFAULT_TITLE = 'True Dating';

const metadata = {
  [routes.home]: {
    title: 'Speed Dating London | Singles Parties | True Dating',
    description:
      "Explore London's best speed dating with the leading dating site in London. Join our platform to enjoy fantastic London venues for speed Dating London.",
    keywords: '"speed Dating, speed Dating London, dating in London, dating site in london, online speed dating, single Parties"',
  },
  [routes.londonBridge]: {
    title: 'Speed Dating London Bridge | Meet Singles | True Dating',
    description:
      'Want to find your partner though don\'t know how to find your one and only? With speed dating London Bridge, you will find passion easier!',
    keywords: 'Speed Dating London Bridge',
  },
  [routes.clapham]: {
    title: 'Speed Dating Clapham | True Dating',
    description:
      'Find a partner and get into a relationship with Speed Dating Clapham. We will help you to meet up with multiple people in just one night. Explore how!',
    keywords: 'Speed Dating Clapham',
  },
  [routes.brixton]: {
    title: 'Speed Dating Brixton | True Dating',
    description:
      'Find someone that shares the same interests as you with Speed Dating Brixton. Find out more about how to find the love of your life in Brixton with True Dating.',
    keywords: 'Speed Dating Brixton',
  },
  [routes.hammersmith]: {
    title: 'Speed Dating Hammersmith | True Dating',
    description:
      'Looking for events in Speed Dating Hammersmith? Everything is simple! Join True Dating and get the right guidance and assistance. Learn more!',
    keywords: 'Speed Dating Hammersmith',
  },
  [routes.chelsea]: {
    title: 'Speed Dating Chelsea | True Dating',
    description:
      'Connect with the right people with Speed Dating Chelsea! True Dating is your best help and guidance to find your love in a fun and relaxed environment.',
    keywords: 'Speed Dating Chelsea',
  },
  [routes.soho]: {
    title: 'Best Speed Dating Soho | True Dating',
    description:
      'Find out more about Speed Dating Soho with True Dating! We aim in bringing like-minded singles together in a fun and electric environment. Explore more!',
    keywords: 'Speed Dating Soho',
  },
  [routes.farringdon]: {
    title: 'Speed Dating Farringdon | Single Events | True Dating',
    description:
      'Explore how to find an event for Speed Dating Farringdon! Sign up with True Dating, and we handle the rest. Explore more on the website.',
    keywords: 'Speed Dating Farringdon',
  },
  [routes.shoreditch]: {
    title: 'Premier Speed Dating Shoreditch | True Dating',
    description:
      'Meet potential partners and make new friends with Speed Dating Shoreditch. Find a unique way of dating by hosting the best events in Shoreditch.',
    keywords: 'Speed Dating Shoreditch',
  },
  [routes.about]: {
    title: 'About Us | True Dating',
    description:
      "True Dating is a premier speed dating and singles events service in London that offers the most outstanding environment and experience to everyone!",
    keywords: 'True Dating',
  },
  [routes.faq]: {
    title: 'Dating Frequently Asked Questions | True Dating',
    description:
      'Check out our frequently asked questions at True Dating. Join our premier speed dating and singles events service in London and enjoy the best benefits!',
    keywords: 'Single People',
  },
  [routes.events]: {
    title: 'Singles Event London | Dating Events London | True Dating',
    description:
      'Interested in single events? Browse to find your best singles event in London with True Dating. Join singles events and enjoy a fun and electric environment.',
    keywords: 'singles event london, dating Events London, singles Events, speed dating event, speed dating events london, dating events',
  },
  [routes.contact]: {
    title: 'Contact Us | True Dating',
    description:
      'Need help? Get in touch with us and we will get back to you as soon as we can. Stay tuned to our speed dating and singles events and enjoy the best experience.',
    keywords: 'Contact',
  },
  [routes.blog]: {
    title: 'Relationship & Dating Blog | True Dating',
    description:
      'Check out True Dating\'s blog to find the most interesting topics. From helpful guidance to tips, and mistakes to avoid. Explore more on the website!',
    keywords: 'Blog',
  },
  [routes.signUp]: {
    title: 'Sign Up | True Dating',
    description:
      'Create your profile today and start connecting with singles looking for true love. Find real connections, get personalized matches, and start meeting new people!',
    keywords: 'Sign up',
  },
  [routes.login]: {
    title: 'Sign in | True Dating',
    description:
      'Login True Dating website and explore our premier speed dating and singles events service in London. Check out the special code to get 10% OFF for events.',
    keywords: 'Sign in',
  },
  [routes.passwordReset]: {
    title: 'Reset Password | True Dating',
    description:
      'Forgot your password? Want to reset? Send your email to get instructions to your email that explain how to reset your password. Explore more at True Dating!',
    keywords: 'Reset Password',
  },
  [routes.tos]: {
    title: 'Booking Terms and Conditions | True Dating',
    description:
      'Check out the terms of service and booking at True Dating. Want to book an event? Get a detailed understanding of cancellations, non-refundable purchases, etc.!',
    keywords: 'Terms and Conditions',
  },
  [routes.membership]: {
    title: 'Become a Member | True Dating',
    description:
      'Find membership information at True dating. Interested in our outstanding events? Become a member and commit to finding that special someone!',
    keywords: 'Membership',
  },
  [routes.sitemap]: {
    title: 'Sitemap | True Dating',
    description:
      'Check out our sitemap at Truedating! Enjoy easy navigation and book your best event with premier speed dating and singles events service in London.',
    keywords: 'Sitemap',
  },
  [routes.privacyPolicy]: {
    title: 'Privacy Policy | True Dating',
    description:
      'Check out our privacy policy at True Dating. Find out how we handle your personal data, privacy statements, who we are, and more useful information.',
    keywords: 'Privacy Policy',
  },
  [routes.riseAndFallOfDatingApps]: {
    title: 'Why are you talking to 10 guys | Dating Apps Rise and Fall',
    description:
      'Join our blog to explore the most interesting. Read the article: ‘Why are you talking to 10 guys?’ The rise and fall of dating apps. Explore more!',
    keywords: '',
  },
  [routes.commonPhrases]: {
    title: '5 Common Phrases That Block You From Experiencing Love',
    description:
      'Read the blog about the 5 Common Phrases People Say That Block Them From Experiencing Deep, True Love. Find related topics at True Dating!',
    keywords: '',
  },
  [routes.datingOver50]: {
    title: 'Dating Again After 50 | True Dating',
    description:
      'Read the topic: Dating Again After 50! Explore How To Start Dating Again After 50 and get helpful tips. Sign in now and explore more interesting!',
    keywords: '',
  },
  [routes.commonDatingMistakes]: {
    title: '6 Most Common Speed Dating Mistakes | True Dating',
    description:
      'Check out the 10 Common Mistakes That Are Hindering Your Speed Dating Success. Get details on how to avoid ruining your speed dating success.',
    keywords: '',
  },
  [routes.notReciprocatingInterest]: {
    title: 'Romantic Interest:  Dropping Hints Extends The Awkwardness',
    description:
      'Find the most interesting in the article: Not Reciprocating Romantic Interest Is Ok But Dropping Hints Extends The Awkwardness. Explore more!',
    keywords: '',
  },
  [routes.waysToUpDatingGame]: {
    title: '10 Ways To Up Your Dating Game | True Dating',
    description:
      'Raise your awareness with this 10 Ways To Up Your Dating Game In 2022. Check out our recent posts at True Dating to find out more about dating.',
    keywords: '',
  },
  [routes.whyDatingApps]: {
    title: 'Why Dating Apps Must Put User Safety At The Top | True Dating',
    description:
      'Learn Why Dating Apps Must Put User Safety At The Top Of Their Agenda In 2022. Stay tuned to our updates for more topics and the best events.',
    keywords: '',
  },
  [routes.datingInCovidWorld]: {
    title: 'Dating In A Covid Vaccinated World | True Dating',
    description:
      'Exploring the Dating In A Covid Vaccinated World with True Dating. Need to learn more? Subscribe to receive emails about our amazing events and discounts.',
    keywords: '',
  },
  [routes.datingTrends]: {
    title: '4 Dating Trends You’re Going To See In Dating | True Dating',
    description:
      'Check out the 4 Dating Trends You’re Going To See In Dating In 2022 (and the end of situationships is one of them). Follow our recent topics to learn more!',
    keywords: '',
  },
  [routes.goodSeducationSkills]: {
    title: 'How Good Are YOUR Seduction Skills | True Dating',
    description:
      'Find out How Good Are YOUR Seduction Skills with True Dating. Discover more with our premier speed dating and singles events service in London.',
    keywords: '',
  },
  [routes.escapeFriendZone]: {
    title: '8 Ways To Escape The Friend Zone | True Dating',
    description:
      'Explore the 8 Ways To Escape The Friend Zone. Need more dating advice and information? Subscribe to receive emails and follow our recent blog posts.',
    keywords: '',
  },
  [routes.interestingDatingMessages]: {
    title: 'How To Be Interesting On Messages: 4 Tips | True Dating',
    description:
      'Find out How To Be Interested In Messages: Get 4 Tips From A Dating Coach. Find every information you need to overcome dating challanges.',
    keywords: '',
  },
  [routes.bestDatingTipsWomen]: {
    title: 'Best Dating Advice For Women Over 40 | True Dating',
    description:
      'Get the Best Dating Advice For Women Over 40. Interested in dating? Subscribe to our channel to receive emails about all future events and discounts.',
    keywords: '',
  },
  [routes.speedDatingWithTrueDating]: {
    title: 'Speed Dating With True Dating | True Dating',
    description:
      'Explore the benefits of Speed Dating With True Dating. Explore the details to find out what makes Speed dating better compared to online dating.',
    keywords: '',
  },
  [routes.greatFirstImpression]: {
    title: '7 Tips To Make A Great First Impression On A Date | True Dating',
    description:
      'Explore the 7 Tips To Make A Great First Impression On A Date. Looking for a dating event? Join True Dating to explore the best events in London.',
    keywords: '',
  },
  [routes.speedDatingMen]: {
    title: 'Speed Dating Tips For Men | True Dating',
    description:
      'Explore speed dating tips for men in True Dating! No need to postpone your speed dating: we will guide you to ensure you have the most incredible experience!',
    keywords: '',
  },
  [routes.speedDatingTipsWomen]: {
    title: 'Speed Dating Tips For Women | True Dating',
    description:
      'Interested in speed dating, however, find some challanges to join? Check out our Speed Dating Tips For Women to attend your first-speed dating event.',
    keywords: '',
  },
  [routes.mostOutOfDating]: {
    title: 'How To Get the Most Out Of Speed Dating | True Dating',
    description:
      'Follow our blog to understand How To Get the Most Out Of Speed Dating. Time to reserve your seat at True Dating\'s next speed dating event! Explore more!',
    keywords: '',
  },
  [routes.firstDate5Ideas]: {
    title: 'Top 5 Gifts For A First Date | True Dating',
    description:
      'Check out the top five gifts for a first date! With True Dating, you will explore everything to join and enjoy your speed dating events. Explore more!',
    keywords: '',
  },
  [routes.irrationalFears]: {
    title: '5 Irrational Fears & Beliefs About No Contact | True Dating',
    description:
      'Find out the 5 Irrational Fears and Beliefs About No Contact. Join True Dating and build your relationship more informed. Explore speed dating events.',
    keywords: '',
  },
  [routes.valentine2023]: {
    title: 'Valentine\'s Day 2023: Origins, Meaning and More | True Dating',
    description:
      'Discover the origins and traditions of Valentine\'s Day. Get all your questions on when Valentine\'s Day is celebrated and how to make it extra memorable!',
    keywords: '',
  },
   [routes.loveHoroscope]: {
    title: 'Love Horoscope for 2023 | True Dating',
    description:
      'Get your love horoscope for 2023 with True Dating. Get insights into your relationships. Find out which areas of your life will be filled with joy and adventure.',
    keywords: '',
  },
  [routes.journeyToFindingRomance]: {
    title: 'Romance and Friendship Journey in London | True Dating',
    description:
      'Looking for love in London? Our aim is to help you find that special someone. Read our blog today to start your Romance and Friendship journey.',
    keywords: '',
  },
  [routes.gayDating]: {
    title: 'Gay Dating Events | Gay Dating in the UK | True Dating',
    description:
      'True Dating provides a safe and welcoming space for gay singles in the UK to find true love. Join us today and start your journey to finding the one!',
    keywords: 'gay dating, gay dating sites, free gay dating sites, gay dating website',
  },
  [routes.christianDating]: {
    title: 'Christian Speed Dating | Christian Singles in UK | True Dating',
    description:
      'Our events provide a safe and relaxed atmosphere to meet other Christians from your area. Find the perfect match and start making meaningful relationships!',
    keywords: 'christian dating site, christian dating for free, free christian dating sites, christian singles',
  },
  [routes.matureDating]: {
    title: 'Mature Dating | Mature Dating Site in UK | True Dating',
    description:
      'True Dating is the UK\'s leading mature dating service for singles over 50 looking for love and companionship. Sign up today to make meaningful connections.',
    keywords: 'uk mature dating, mature dating sites in uk, mature dating london',
  },
  [routes.healBrokenHeart]: {
    title: 'Broken Heart: How to Get Over Heartbreak | True Dating',
    description:
      'Everyone experiences heartbreak at some point in life. Learn how to get over a broken heart with True Dating\'s expert advice. Learn more today.',
  },
  [routes.signsFallingInLove]: {
    title: 'Signs You’re Falling in Love: How to Tell You Like Them | True Dating',
    description:
      'Are you in love? Learn how to tell if you’re falling in love with someone. Find out the signs and symptoms of falling in love. Read our blog.',
  },
  [routes.romanticPlacesInLondon]: {
    title: 'Best Romantic Walks in London: Romantic Places in London | True Dating',
    description:
      'Discover the most romantic walks in London! Explore the best places to take a romantic stroll with your partner. Read our blog for tips and advice.',
  },
  [routes.firstDateQuestions]: {
    title: 'First Date Questions։ What To Talk About On A First Date | True Dating',
    description:
      'Our blog includes conversation starters, tips for breaking the ice, and advice for creating a fun, memorable experience on your first date. Read more.',
  },
  [routes.meetingParents]: {
    title: 'Tips for Meeting the Partner\'s Parents First Time | True Datin',
    description:
      'Meeting your partner\'s parents for the first time can be an intimidating experience․ Get the advice to make a good impression and ensure meeting goes smoothly',
  },
};

const updateMetaTags = (title, description, keywords) => {
  document.title = title;
  let descriptionMeta = document.querySelector('meta[name=description]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }

  let keywordsMeta = document.querySelector('meta[name=keywords]');
  if (!keywordsMeta) {
    keywordsMeta = document.createElement('meta');
    keywordsMeta.setAttribute('name', 'keywords');
    document.head.appendChild(keywordsMeta);
  }

  descriptionMeta.setAttribute('content', description);
  keywordsMeta.setAttribute('content', keywords);
};

export const handleMetaTags = (path) => {
  if (path == routes.faq) {
    // add faq scheme markup
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.async = true;
    s.innerHTML = faqMarkup;
    document.head.appendChild(s);
  }
  else if (path == routes.valentine2023) {
    // add faq scheme markup
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.async = true;
    s.innerHTML = valentine2023Schema;
    document.head.appendChild(s);
  }
  else if (path == routes.matureDating) {
    // add mature scheme markup
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.innerHTML = JSON.stringify(matureDatingMarkup);
    document.head.appendChild(s);
  }
  else if (path == routes.events) {
    // add mature scheme markup
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.innerHTML = JSON.stringify(eventsMarkup);
    document.head.appendChild(s);
  }
  else if (path == routes.christianDating) {
    // add mature scheme markup
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.innerHTML = JSON.stringify(christianDatingMarkup);
    document.head.appendChild(s);
  }
  else if (path == routes.gayDating) {
    // add mature scheme markup
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.innerHTML = JSON.stringify(gayDatingMarkup);
    document.head.appendChild(s);
  }
  else if (path == routes.commonPhrases) {
    // add blog scheme markup
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.innerHTML = JSON.stringify(commonPhraseMarkup);
    document.head.appendChild(s);
  }
  if (Object.keys(metadata).includes(path)) {
    const { title, description, keywords } = metadata[path];
    return updateMetaTags(title, description, keywords);
  }

  updateMetaTags(DEFAULT_TITLE, '', '');
};


// used https://jsstringconverter.bbody.io/
const faqMarkup =  "{" +
	"  \"@context\": \"https://schema.org\"," +
	"  \"@type\": \"FAQPage\"," +
	"  \"mainEntity\": [{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"Why is True Dating a better alternative to dating apps?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"Dating apps are tedious, time consuming, photos can be misleading, matching with someone can turn into serial messaging without an end to an actual date – need we go on? True Dating allows you the opportunity to meet lots of other single people, in real-life, that are also looking for that someone special.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"What is the difference between Speed Dating and Singles Parties?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"Our Speed Dating events are a series of short dates (typically 4-5 minutes each) where you will meet everyone for one date each. Singles Parties are exactly that – a gathering of singles typically held in a venue where everyone has the space to walk around, have a few drinks and mingle. Both types of events will have our friendly hosts on-hand to keep the event flowing smoothly and ensure you have a great time.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"Can I attend events even if I don’t fit the age range?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"Ideally we recommend sticking to your age range. If you’re unsure, please reach out to us at contact@truedating.co.uk\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"What should I wear to the event? Is there a dress code?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"There is no dress code. We encourage everyone to come as the best version of themselves, in something they will feel confident and comfortable in but why not dress to impress?!\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"Can I bring a friend with me?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"Of course! We very frequently have groups of friends attend events together – just make sure everyone has bought their individual tickets for entry, online and through our website. We will not accept payment at the door.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"How many people will I meet?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"This depends on the event – for speed dating, you will typically meet 10-15 people, while our Singles Parties can be a much higher number depending on the turnout for that event.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"What kind of people can I expect to meet at the events?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"Just like London itself, our daters range from all backgrounds, ages, personalities and walks of life. We find most people who attend our events are confident, respectful and genuine people looking for love.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"Do I need to do anything before the event?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"No, just be sure to show up a little early or right on time to the event so we can get started. If you ever have any questions before the event, you can contact us at contact@truedating.co.uk\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"What if I cannot attend an event I’ve purchased a ticket for?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"We completely understand if you cannot make it. We ask that you please reach out to us as soon as possible at contact@truedating.co.uk to let us know so we can book you onto another event.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"What happens after a speed dating event?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"After the event, you will need to log in to your True Dating account and let us know who you fancy! The day following the event, you will be able to see who you matched with and message securely via your True Dating account.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"How will I know if I matched with someone at speed dating?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"You will receive an email the following day after 5pm alerting you that your matches are live.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"What if I don’t meet anyone I’m interested in?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"Majority of the time, we find our daters typically would like a second date with at least one person they meet, however, if you don’t - your next speed dating event is on us!\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"How does payment work?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"We only accept card payments securely via our website. This is done via Stripe, a leading company in payments and security. We will never repeat bill you for an event. We do not accept cash on the door.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"What information can my matches see?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"The only personal information your matches can see is your name and your photo, if you choose to upload one on your account. You will be able to securely message them via your account rather than email.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"Where do you hold events?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"We use some of the best bars in London to hold our speed dating and singles social events. They are usually easily accessible by public transport, offer great service and have the perfect atmosphere for a dating event. If you’re a venue that would be interested in working with us please contact us at: contact@truedating.co.uk\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"What if I can’t access my account?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"Just email us at: contact@truedating.co.uk if there are any issues with your True Dating account and we will try our best to resolve the problem as soon as possible.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"Can I close my account?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"Yes of course. Just email us at: contact@truedating.co.uk It normally takes between 1-2 days for your account to be deleted and we will no longer hold your data.\"" +
	"    }" +
	"  },{" +
	"    \"@type\": \"Question\"," +
	"    \"name\": \"Do you have a question that isn’t answered here?\"," +
	"    \"acceptedAnswer\": {" +
	"      \"@type\": \"Answer\"," +
	"      \"text\": \"We pride ourselves on having excellent customer service. If you have any questions or concerns please get in touch, and we will respond typically within a few hours: contact@truedating.co.uk\"" +
	"    }" +
	"  }]" +
	"}" +
	"";

  const valentine2023Schema = "<script type=\"application/ld+json\">" +
	"{" +
	"  \"@context\": \"https://schema.org/\"," +
	"  \"@type\": \"BlogPosting\"," +
	"  \"author\": {" +
	"    \"@type\": \"Organization\"," +
	"    \"name\": \"True Dating\"" +
	"  }," +
	"  \"headline\": \"The Origins & Meaning of Valentine's Day: When Is Valentine's Day?\"," +
	"  \"image\": {" +
	"    \"@type\": \"ImageObject\"," +
	"    \"url\": \"https://firebasestorage.googleapis.com/v0/b/true-dating-ff8ed.appspot.com/o/images%2Fblogs%2F1863a766-9fea-caa0-56f0-89b194b74881?alt=media&token=fcd6886a-e87a-4ab1-b302-5cddd24f3b8d\"" +
	"  }," +
	"  \"datePublished\": \"2022-02-08T20:00:00.000Z\"," +
	"  \"publisher\": {" +
	"    \"@type\": \"Organization\"," +
	"    \"name\": \"True Dating\"," +
	"    \"logo\": {" +
	"      \"@type\": \"ImageObject\"," +
	"      \"url\": \"https://truedating.co.uk/logo_pink.svg\"" +
	"    }," +
	"    \"address\": \"Stateland Court, 3 Cranbrook Lane, London, N11 1PH\"" +
	"  }," +
	"  \"keywords\": [" +
	"    \"why do we celebrate valentine's day\"," +
	"    \"national lover's day\"," +
	"    \"Valentine's Day Meaning\"," +
	"    \"origins of valentine's day\"," +
	"    \"Valentine's Day 2023\"," +
	"    \"what is valentine's day\"," +
	"    \"When is  valentine's day\"," +
	"    \"Valentine's Day,\"" +
	"  ]," +
	"  \"description\": \"Discover the origins and traditions of Valentine's Day. Get all your questions on when Valentine's Day is celebrated and how to make it extra memorable!\"" +
	"}" +
	"</script>" +
	"";
