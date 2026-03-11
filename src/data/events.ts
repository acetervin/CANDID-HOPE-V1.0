import type { ReactNode } from "react";

export type EventItem = {
  slug: string;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  desc: string;
};

export const upcomingEvents: EventItem[] = [
  {
    slug: "youth-leadership-summit-2025",
    image:
      "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Youth Leadership Summit 2025",
    date: "March 15, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Nairobi Community Center",
    desc: "A full-day summit bringing together young leaders from across Nairobi for workshops, networking, and inspiration.",
  },
  {
    slug: "parent-caregiver-workshop",
    image:
      "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Parent & Caregiver Workshop",
    date: "April 5, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Candid Hope Office, Nairobi",
    desc: "Interactive workshop on positive parenting, communication skills, and supporting youth mental health at home.",
  },
  {
    slug: "life-skills-training-bootcamp",
    image:
      "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Life Skills Training Bootcamp",
    date: "May 10-12, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "Various Schools, Nairobi",
    desc: "Three-day intensive bootcamp covering decision-making, financial literacy, and career planning for secondary school students.",
  },
  {
    slug: "community-fun-day-fundraiser",
    image:
      "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Community Fun Day & Fundraiser",
    date: "June 21, 2025",
    time: "11:00 AM - 6:00 PM",
    location: "Uhuru Gardens, Nairobi",
    desc: "A family-friendly day of activities, entertainment, and fundraising to support Candid Hope's programs. Food, games, and live performances.",
  },
];

export type PastEventItem = {
  image: string;
  title: string;
  date: string;
  attendees: number;
};

export const pastEvents: PastEventItem[] = [
  {
    image:
      "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Mental Health Awareness Walk",
    date: "October 10, 2024",
    attendees: 200,
  },
  {
    image:
      "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Digital Skills Workshop",
    date: "September 15, 2024",
    attendees: 80,
  },
  {
    image:
      "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Holiday Feeding Program",
    date: "December 20, 2024",
    attendees: 350,
  },
];
