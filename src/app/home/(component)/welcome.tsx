'use client';

import TestimonialCard1 from '../../testimonial/(component)/card1';
import TestimonialCard2 from '../../testimonial/(component)/card2';
import { TestimonialModel } from '@/model/testimonial.model';
import { Typography } from '@material-tailwind/react';

// testimonials 1
const testimonials1: TestimonialModel[] = [
    {
        id: 1,
        quote: "Great things in business are never done by one person. They're done by a team of people.",
        author: 'Steve Jobs',
        title: 'Co-founder, chairman, and CEO of Apple Inc.',
        photo: 'https://m.media-amazon.com/images/I/71mmowWE5iL._AC_UF1000,1000_QL80_.jpg',
    },
    {
        id: 2,
        quote: "Success is a lousy teacher. It seduces smart people into thinking they can't lose.",
        author: 'Bill Gates',
        title: 'Co-founding of Microsoft and Bill & Melinda Gates Foundation',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bill_Gates_-_2023_-_P062021-967902_%28cropped%29.jpg/440px-Bill_Gates_-_2023_-_P062021-967902_%28cropped%29.jpg',
    },
];

// testimonials 2
const testimonials2: TestimonialModel[] = [
    {
        id: 3,
        quote: 'Success isn’t overnight. It’s when everyday you get a little better than the day before. It all adds up.',
        author: 'Dwayne Johnson',
        title: 'American actor, professional wrestler, and businessman',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg/440px-Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg',
    },
];

/**
 * ANCHOR Welcome
 * @date 9/12/2024 - 5:29:18 PM
 *
 * @returns {*}
 */
const Welcome = () => {
    return (
        <section className="py-5">
            <div className="container mx-auto">
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-4 !text-2xl lg:!text-4xl">
                    Create your awesome to do tasks
                </Typography>
                <Typography
                    variant="lead"
                    className="max-w-3xl !text-gray-500 mb-6 md:mb-14">
                    Success starts with small consistent tasks each day, begin
                    by creating an account and start your journey to success.
                </Typography>
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                    {testimonials1.map((testimonial) => (
                        <TestimonialCard1
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
                {testimonials2.map((testimonial) => (
                    <TestimonialCard2
                        key={testimonial.id}
                        testimonial={testimonial}
                    />
                ))}
            </div>
        </section>
    );
};

export default Welcome;
