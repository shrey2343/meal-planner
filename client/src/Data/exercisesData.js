const exercises = [


  {
    id: 'ex22',
    name: 'Plank',
    category: 'Core',
    duration: 3,
    level: 'Beginner',
    equipment: 'None',
    imageUrl: '/images/plank.jpeg',
    description: 'Core stability exercise that strengthens abs and back.',
    benefits: ['Improves core strength', 'Enhances balance'],
    steps: [
      'Start in a forearm plank position with elbows under shoulders.',
      'Keep your body in a straight line from head to heels.',
      'Engage your core and avoid sagging hips.',
      'Hold the position for the set duration.'
    ]
  },
  {
    id: 'ex1',
    name: 'Jumping Jacks',
    category: 'Cardio',
    duration: 5,
    level: 'Beginner',
    equipment: 'None',
    imageUrl: '/images/jumping-jacks.jpeg',
    description: 'A full-body warm-up exercise that increases heart rate.',
    benefits: ['Improves circulation', 'Boosts stamina'],
    steps: [
      'Stand upright with feet together and arms at your sides.',
      'Jump while spreading your legs and raising your arms overhead.',
      'Jump again to return to the starting position.',
      'Repeat at a steady pace for the set duration.'
    ]
  },
  {
    id: 'ex2',
    name: 'Push-Ups',
    category: 'Strength',
    duration: 10,
    level: 'Intermediate',
    equipment: 'None',
    imageUrl: '/images/push-ups.jpeg',
    description: 'Upper body strength exercise targeting chest and triceps.',
    benefits: ['Builds upper body strength', 'Improves posture'],
    steps: [
      'Start in a high plank position with hands shoulder-width apart.',
      'Lower your body until your chest nearly touches the floor.',
      'Keep elbows close to your body and back straight.',
      'Push back up to the starting position and repeat.'
    ]
  },
  
  {
    id: 'ex4',
    name: 'Squats',
    category: 'Strength',
    duration: 8,
    level: 'Intermediate',
    equipment: 'Bodyweight',
    imageUrl: '/images/squats.jpeg',
    description: 'Lower body exercise that targets thighs and glutes.',
    benefits: ['Strengthens legs', 'Improves mobility'],
    steps: [
      'Stand with feet shoulder-width apart and arms extended forward.',
      'Lower your hips back and down as if sitting into a chair.',
      'Keep chest up and knees aligned with toes.',
      'Push through heels to return to standing and repeat.'
    ]
  },
  {
    id: 'ex5',
    name: 'Mountain Climbers',
    category: 'Cardio',
    duration: 6,
    level: 'Advanced',
    equipment: 'None',
    imageUrl: '/images/mountain-climbers.jpeg',
    description: 'High-intensity cardio move that also works your core.',
    benefits: ['Burns calories', 'Improves agility'],
    steps: [
      'Start in a high plank position with hands under shoulders.',
      'Drive one knee toward your chest, then quickly switch legs.',
      'Continue alternating legs in a running motion.',
      'Maintain a steady rhythm and keep your core engaged.'
    ]
  },

  {
    id: 'ex6',
    name: 'Wall Sit',
    category: 'Strength',
    duration: 4,
    level: 'Beginner',
    equipment: 'None',
    imageUrl: '/images/wall-sit.jpeg',
    description: 'Static lower body exercise that builds endurance.',
    benefits: ['Strengthens thighs', 'Improves posture'],
     steps: [
      'Stand with your back against a wall and feet shoulder-width apart.',
      'Slide down until your knees are at a 90-degree angle.',
      'Hold the position while keeping your back flat against the wall.',
      'Maintain for the set duration.'
    ]
  },
  {
    id: 'ex7',
    name: 'Arm Circles',
    category: 'Mobility',
    duration: 2,
    level: 'Beginner',
    equipment: 'None',
    imageUrl: '/images/arm-circles.jpeg',
    description: 'Gentle shoulder mobility exercise.',
    benefits: ['Loosens joints', 'Improves range of motion'],
     steps: [
      'Extend your arms out to the sides at shoulder height.',
      'Make small circles forward for half the time.',
      'Then reverse direction and make small backward circles.',
      'Keep shoulders relaxed and controlled.'
    ]
  },
  {
    id: 'ex8',
    name: 'Toe Taps',
    category: 'Cardio',
    duration: 3,
    level: 'Beginner',
    equipment: 'None',
    imageUrl: '/images/toe-taps.jpeg',
    description: 'Low-impact cardio move for warm-up.',
    benefits: ['Boosts circulation', 'Improves coordination'],
    steps: [
      'Stand facing a step or low surface.',
      'Tap one foot on the surface, then quickly switch feet.',
      'Continue alternating feet at a steady pace.',
      'Keep your core engaged and arms relaxed.'
    ]
  },
  {
    id: 'ex9',
    name: 'Cat-Cow Stretch',
    category: 'Flexibility',
    duration: 2,
    level: 'Beginner',
    equipment: 'None',
    imageUrl: '/images/cat-cow.jpeg',
    description: 'Gentle spine mobility stretch.',
    benefits: ['Relieves tension', 'Improves spinal flexibility'],
    steps: [
      'Start on all fours with hands under shoulders and knees under hips.',
      'Inhale and arch your back, lifting your head and tailbone (Cow).',
      'Exhale and round your spine, tucking chin and pelvis (Cat).',
      'Repeat slowly, syncing breath with movement.'
    ]
  },
  {
    id: 'ex10',
    name: 'March in Place',
    category: 'Cardio',
    duration: 5,
    level: 'Beginner',
    equipment: 'None',
    imageUrl: '/images/march-in-place.jpeg',
    description: 'Simple cardio move to elevate heart rate.',
    benefits: ['Improves endurance', 'Warms up body'],
    steps: [
      'Stand tall with arms relaxed at your sides.',
      'Lift one knee toward your chest while swinging opposite arm.',
      'Alternate legs in a marching rhythm.',
      'Maintain steady breathing and posture.'
    ]
  },

  // Intermediate Level
  {
    id: 'ex3',
    name: 'Push-Ups',
    category: 'Strength',
    duration: 10,
    level: 'Intermediate',
    equipment: 'None',
    imageUrl: '/images/push-ups.jpeg',
    description: 'Upper body strength exercise targeting chest and triceps.',
    benefits: ['Builds upper body strength', 'Improves posture']
  },
  
  {
    id: 'ex11',
    name: 'Lunges',
    category: 'Strength',
    duration: 6,
    level: 'Intermediate',
    equipment: 'None',
    imageUrl: '/images/lunges.png',
    description: 'Leg exercise that improves balance and strength.',
    benefits: ['Tones legs', 'Improves stability'],
    steps: [
      'Stand upright with feet hip-width apart.',
      'Step forward with one leg and lower your hips until both knees are bent at 90 degrees.',
      'Push back to the starting position and switch legs.',
      'Repeat alternating sides.'
    ]
  },
  {
    id: 'ex12',
    name: 'Bicycle Crunches',
    category: 'Core',
    duration: 5,
    level: 'Intermediate',
    equipment: 'None',
    imageUrl: '/images/bicycle-crunches.jpeg',
    description: 'Dynamic core move targeting abs and obliques.',
    benefits: ['Strengthens core', 'Improves coordination'],
    steps: [
      'Lie on your back with hands behind your head and legs lifted.',
      'Bring one knee toward your chest while rotating your torso to touch opposite elbow.',
      'Switch sides in a pedaling motion.',
      'Keep core engaged and movement controlled.'
    ]
  },
  {
    id: 'ex13',
    name: 'Step-Ups',
    category: 'Cardio',
    duration: 7,
    level: 'Intermediate',
    equipment: 'Bench or step',
    imageUrl: '/images/step-ups.jpeg',
    description: 'Cardio-strength hybrid using elevated surface.',
    benefits: ['Boosts stamina', 'Strengthens legs'],
    steps: [
      'Stand facing a bench or step.',
      'Step one foot onto the surface and push through heel to lift your body.',
      'Step down and repeat with the other leg.',
      'Maintain a steady rhythm and posture.'
    ]
  },
  {
    id: 'ex14',
    name: 'Superman Hold',
    category: 'Core',
    duration: 4,
    level: 'Intermediate',
    equipment: 'None',
    imageUrl: '/images/superman-hold.jpeg',
    description: 'Back and glute activation exercise.',
    benefits: ['Improves posture', 'Strengthens lower back']
  },
  {
    id: 'ex15',
    name: 'Side Plank',
    category: 'Core',
    duration: 5,
    level: 'Intermediate',
    equipment: 'None',
    imageUrl: '/images/side-plank.jpeg',
    description: 'Targets obliques and improves core stability.',
    benefits: ['Tones waist', 'Improves balance'],
    steps: [
      'Lie face down with arms extended forward and legs straight.',
      'Lift arms, chest, and legs off the ground simultaneously.',
      'Hold the position while squeezing glutes and back.',
      'Lower slowly and repeat.'
    ]
  },

  //  Advanced Level
  
  {
    id: 'ex16',
    name: 'Burpees',
    category: 'Cardio',
    duration: 8,
    level: 'Advanced',
    equipment: 'None',
    imageUrl: '/images/burpees.jpeg',
    description: 'Full-body explosive cardio move.',
    benefits: ['Boosts metabolism', 'Improves endurance'],
    steps: [
      'Start standing, then drop into a squat with hands on the ground.',
      'Kick your feet back into a plank position.',
      'Do a push-up, then jump feet back to squat.',
      'Explode upward into a jump and repeat.'
    ]
  },
  {
    id: 'ex17',
    name: 'Jump Squats',
    category: 'Strength',
    duration: 6,
    level: 'Advanced',
    equipment: 'None',
    imageUrl: '/images/jump-squats.jpeg',
    description: 'Explosive leg exercise for power and speed.',
    benefits: ['Builds strength', 'Improves athleticism'],
    steps: [
      'Start in a squat position with feet shoulder-width apart.',
      'Lower down, then explode upward into a jump.',
      'Land softly and return to squat position.',
      'Repeat with controlled movement.'
    ]
  },
  {
    id: 'ex18',
    name: 'Pike Push-Ups',
    category: 'Strength',
    duration: 7,
    level: 'Advanced',
    equipment: 'None',
    imageUrl: '/images/pike-pushups.jpeg',
    description: 'Shoulder-focused push-up variation.',
    benefits: ['Strengthens shoulders', 'Improves control'],
    steps: [
      'Start in a downward dog position with hips raised.',
      'Lower your head toward the ground by bending elbows.',
      'Push back up to the starting position.',
      'Keep core engaged and movement slow.'
    ]
  },
  {
    id: 'ex19',
    name: 'Plank to Push-Up',
    category: 'Core',
    duration: 5,
    level: 'Advanced',
    equipment: 'None',
    imageUrl: '/images/plank-to-pushup.jpeg',
    description: 'Dynamic core and upper body combo.',
    benefits: ['Improves coordination', 'Builds endurance'],
    steps: [
      'Start in a forearm plank position.',
      'Push up one arm at a time into a high plank.',
      'Lower back down one arm at a time.',
      'Repeat while keeping hips stable.'
    ]
  },
  {
    id: 'ex20',
    name: 'High Knees',
    category: 'Cardio',
    duration: 6,
    level: 'Advanced',
    equipment: 'None',
    imageUrl: '/images/high-knees.jpeg',
    description: 'Fast-paced cardio move for agility and speed.',
    benefits: ['Burns fat', 'Improves leg drive'],
    steps: [
      'Stand tall with feet hip-width apart.',
      'Run in place while lifting knees toward chest.',
      'Pump arms in sync with legs.',
      'Maintain speed and posture throughout.'
    ]
  },
  {
    id: 'ex21',
    name: 'V-Ups',
    category: 'Core',
    duration: 5,
    level: 'Advanced',
    equipment: 'None',
    imageUrl: '/images/v-ups.jpeg',
    description: 'Advanced ab move targeting upper and lower abs.',
    benefits: ['Defines abs', 'Improves flexibility'],
    steps: [
      'Lie flat on your back with arms extended overhead.',
      'Lift legs and upper body simultaneously to form a V shape.',
      'Reach hands toward feet, then lower slowly.',
      'Repeat with control and core engagement.'
    ]
  }
];

export default exercises;


