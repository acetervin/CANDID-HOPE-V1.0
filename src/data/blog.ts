export type BlogPost = {
  slug: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "life-skills-training-changing-youth-outcomes",
    image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Programs",
    date: "Jan 15, 2025",
    title: "How Life Skills Training Is Changing Youth Outcomes in Nairobi",
    excerpt: "Our latest cohort of youth participants share their transformative experiences after completing the life skills training program.",
  },
  {
    slug: "parent-workshop-building-stronger-families",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Community",
    date: "Dec 20, 2024",
    title: "Parent Workshop Series: Building Stronger Families Together",
    excerpt: "Candid Hope's caregiver workshops bring parents together to learn positive parenting techniques and support strategies.",
  },
  {
    slug: "year-in-review-reaching-1689-community-members",
    image: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Impact",
    date: "Nov 8, 2024",
    title: "Year in Review: Reaching 1,689 Community Members",
    excerpt: "A look back at the milestones, programs, and lives touched by Candid Hope throughout the year.",
  },
  {
    slug: "digital-literacy-preparing-youth",
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Education",
    date: "Oct 3, 2024",
    title: "Digital Literacy: Preparing Youth for Tomorrow's Job Market",
    excerpt: "Our new digital literacy program equips young people with computer skills essential for modern employment opportunities.",
  },
  {
    slug: "breaking-stigma-mental-health-schools",
    image: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Health",
    date: "Sep 12, 2024",
    title: "Breaking the Stigma: Mental Health Conversations in Schools",
    excerpt: "Candid Hope partners with local schools to create safe spaces for mental health discussions among students.",
  },
  {
    slug: "meet-our-volunteers-stories-of-dedication",
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Volunteers",
    date: "Aug 5, 2024",
    title: "Meet Our Volunteers: Stories of Dedication and Impact",
    excerpt: "Hear from the dedicated volunteers who give their time and energy to make Candid Hope's programs possible.",
  },
];
