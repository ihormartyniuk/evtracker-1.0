import type {
  AppCopy,
  QuizQuestion,
  ProfileCopy,
  PlanByProfile,
  TipsList,
  OffersCopy,
  ProfileType,
} from './types'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'What usually triggers your evening snacks?',
    options: [
      { value: 'stress', label: 'Stressful day at work' },
      { value: 'habit', label: 'Just a habit while watching TV' },
      { value: 'tired', label: 'Low energy & exhaustion' },
      { value: 'late', label: 'Staying up past midnight' },
    ],
  },
  {
    id: 'q2',
    text: 'How does your body feel around 9 PM?',
    options: [
      { value: 'stress', label: 'Tense shoulders or "racing" mind' },
      { value: 'habit', label: 'Bored, looking for something to do' },
      { value: 'tired', label: 'Physically drained but restless' },
      { value: 'late', label: 'Surprisingly alert and "wired"' },
    ],
  },
  {
    id: 'q3',
    text: 'What is your biggest struggle at bedtime?',
    options: [
      { value: 'stress', label: 'I can\'t stop thinking about tomorrow' },
      { value: 'habit', label: 'I feel like my evening is "incomplete"' },
      { value: 'tired', label: 'I fall asleep but wake up at 3 AM' },
      { value: 'late', label: 'I just don\'t feel sleepy yet' },
    ],
  },
  {
    id: 'q4',
    text: 'How often do you reach for food after dinner?',
    options: [
      { value: 'stress', label: 'Mostly after very stressful days' },
      { value: 'habit', label: 'Almost every night, like a ritual' },
      { value: 'tired', label: 'When I’m too tired to go to bed' },
      { value: 'late', label: 'Late at night when I get a "second wind"' },
    ],
  },
  {
    id: 'q5',
    text: 'What would help you most?',
    options: [
      { value: 'stress', label: 'Switching off my "stress mode"' },
      { value: 'habit', label: 'Replacing snacks with a healthy ritual' },
      { value: 'tired', label: 'Waking up feeling actually refreshed' },
      { value: 'late', label: 'Fixing my "night owl" schedule' },
    ],
  },
]

export const profileCopyByType: Record<ProfileType, ProfileCopy> = {
  stress: {
    title: 'The Emotional Eater Profile',
    subtitle: 'Your brain uses food to feel safe.',
    explanation: [
      'When you\'re stressed, your cortisol levels spike, making you crave sugar for a quick "calm" hit.',
      'The key isn\'t willpower—it\'s lowering your cortisol before the cravings hit.',
    ],
  },
  habit: {
    title: 'The Routine Snacker Profile',
    subtitle: 'Your brain is on "Autopilot" mode.',
    explanation: [
      'You’ve built a strong neural link between the couch and snacking.',
      'To break this, we need to "trick" your brain with a new, healthier sensory ritual.',
    ],
  },
  tired: {
    title: 'The Fatigue Craver Profile',
    subtitle: 'Your body mistakes exhaustion for hunger.',
    explanation: [
      'When you’re overtired, your hunger hormones spike because your brain is desperate for energy.',
      'A deep recovery ritual will suppress these false hunger signals.',
    ],
  },
  late: {
    title: 'The Night Owl Profile',
    subtitle: 'Your biological clock is out of sync.',
    explanation: [
      'Staying up late creates a "hunger window" that wouldn’t exist if you were asleep.',
      'We need to signal your brain that the "kitchen is closed" via a specific bedtime ritual.',
    ],
  },
}

export const planDay0ByProfile: PlanByProfile = {
  stress: {
    title: 'Your Cortisol-Reset Plan',
    steps: [
      {
        title: 'Step 1: The "Stop-Crave" Tea Ritual',
        body: 'Sip our botanical blend. The warmth and herbs signal your nervous system to switch from "Stress" to "Rest", killing the urge to snack.',
      },
      {
        title: '9:00 PM: Digital Sunset',
        body: 'Phones away. Blue light keeps stress hormones high. Give your brain 30 minutes of quiet time.',
      },
      {
        title: '5-Minute Box Breathing',
        body: 'Inhale for 4, hold for 4, exhale for 4. This physically lowers your heart rate more than any snack.',
      },
    ],
  },
  habit: {
    title: 'Your Habit-Breaker Plan',
    steps: [
      {
        title: 'Step 1: Substitution Ritual',
        body: 'The strongest way to break a habit is replacing it. Sipping herbal tea provides the same hand-to-mouth comfort as snacking.',
      },
      {
        title: 'Change Your Environment',
        body: 'If you usually snack on the couch, try sitting in a different chair or dimming the lights differently tonight.',
      },
      {
        title: 'The "Kitchen Closed" Signal',
        body: 'After your tea, brush your teeth immediately. It’s a powerful psychological signal that eating is over.',
      },
    ],
  },
  tired: {
    title: 'Your Deep Recovery Plan',
    steps: [
      {
        title: 'Step 1: Natural Sedation Ritual',
        body: 'Use our Magnesium-rich tea blend to prep muscles for sleep, stopping the "exhaustion hunger" before it starts.',
      },
      {
        title: 'The 10 PM Power-Down',
        body: 'Go to bed 15 minutes earlier. Most snacking happens in the "exhaustion window" when we are too tired to move.',
      },
      {
        title: 'Cool Down the Room',
        body: 'Lower the temperature. A cool body signals the brain it’s time for sleep, not for digestion.',
      },
    ],
  },
  late: {
    title: 'Your Circadian Reset Plan',
    steps: [
      {
        title: 'Step 1: The Midnight-Crave Shield',
        body: 'Sip our botanical tea at 9:30 PM. It stabilizes your senses and prepares your body for an earlier transition.',
      },
      {
        title: 'Set a "Sleep Alarm"',
        body: 'Don’t just set an alarm to wake up. Set one for 10:00 PM to remind your brain the day is officially done.',
      },
      {
        title: 'Dim to Red Light',
        body: 'Switch off overhead lights. This triggers natural melatonin, making snacking feel "wrong" for the hour.',
      },
    ],
  },
}

export const planDay1ByProfile: PlanByProfile = {
  stress: {
    title: 'Consistency is Your Shield',
    steps: [
      {
        title: 'Analyze Yesterday',
        body: 'Did the tea help you feel calmer? Most users report a 60% drop in anxiety after the second night.',
      },
      {
        title: 'Keep the Ritual',
        body: 'Prepare your tea 10 minutes earlier today to stay ahead of the stress.',
      },
    ],
  },
  habit: {
    title: 'Rewiring Your Brain',
    steps: [
      {
        title: 'Victory Lap',
        body: 'You broke the cycle for one night! Your brain is already starting to weaken the "Couch-Snack" link.',
      },
      {
        title: 'Focus on the Flavor',
        body: 'Enjoy the ritual of brewing. Make the tea the highlight of your evening.',
      },
    ],
  },
  tired: {
    title: 'Building Real Energy',
    steps: [
      {
        title: 'Morning Check-in',
        body: 'Notice how you don\'t have a "food hangover" today. That’s your metabolism thanking you.',
      },
      {
        title: 'Early Prep',
        body: 'Get your tea mug ready on the counter now so you don’t have to "think" when you’re tired tonight.',
      },
    ],
  },
  late: {
    title: 'Winning Back Your Morning',
    steps: [
      {
        title: 'Shift the Clock',
        body: 'Try to move your "Tea Ritual" another 10 minutes earlier tonight.',
      },
      {
        title: 'Morning Light',
        body: 'Get 5 minutes of sunlight this morning to lock in the sleep-cycle progress.',
      },
    ],
  },
}

export const tips: TipsList = [
  'Hunger or Thirst? Often, evening hunger is actually mild dehydration. Try tea first.',
  'The 15-Minute Rule: Cravings usually last only 15 minutes. A tea ritual perfectly fills this gap.',
  'Magnesium is your friend: It relaxes muscles and stops sugar cravings naturally.',
  'Avoid "Hidden" Caffeine: Some soft drinks and chocolates can keep you wired until 2 AM.',
  'Smell yourself calm: Lavender or Chamomile scents can lower cortisol instantly.',
]

export const offers: OffersCopy = {
  soft: {
    title: 'The "Snack-Free" Tea Ritual',
    description: 'Based on your profile, we’ve selected a specific botanical blend designed to switch off your "hunger hormones" and calm your nervous system.',
    features: [],
    ctaLabel: 'View My Recommended Blend',
  },
  main: {
    title: 'Your Evening Transformation Kit',
    description: 'Stop fighting your willpower. Our Premium Evening Tea Blend uses Valerian Root and Chamomile to naturally bridge the gap between "Stressed" and "Sleeping".',
    features: [
      'Eliminates late-night sugar cravings',
      'Clinically proven calming herbs',
      '30-Day Ritual Pack',
      'Free Shipping on your first order',
    ],
    ctaLabel: 'Start My Ritual Now',
  },
}

export const appCopy: AppCopy = {
  landing: {
    headline: 'Stop Late-Night Snacking. For Good.',
    subheadline: 'Scientific 3-minute evening ritual to crush cravings, improve sleep, and wake up feeling lighter.',
    ctaLabel: 'Get Personalized Plan →',
  },
}

export const landingHeadlineVariants = {
  A: {
    headline: 'Stop Late-Night Snacking. For Good.',
    subheadline: 'Scientific 3-minute evening ritual to crush cravings and wake up feeling lighter.',
  },
  B: {
    headline: 'Wake Up Lighter. Every Morning.',
    subheadline: '87% of users stopped their midnight cravings using this personalized evening roadmap.',
  },
}

export const day0SoftOfferVariants = {
  A: {
    title: 'The "Snack-Free" Tea Ritual',
    description: 'Based on your profile, we’ve selected a specific botanical blend designed to switch off your "hunger hormones" and calm your nervous system.',
  },
  B: {
    title: 'Order Your Evening Tea',
    description: 'A calming tea blend that helps you relax before bed. Users report falling asleep faster and having zero snack cravings.',
  },
}