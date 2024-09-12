import { TestimonialModel } from '@/model/testimonial.model';
import {
    Card,
    CardBody,
    Typography,
    CardHeader,
    Avatar,
} from '@material-tailwind/react';

/**
 * ANCHOR Props
 * @date 9/12/2024 - 5:22:19 PM
 *
 * @typedef {Props}
 */
type Props = {
    testimonial: TestimonialModel;
};

/**
 * ANCHOR Card 2
 * @date 9/12/2024 - 5:57:00 PM
 *
 * @param {Props} { testimonial }
 * @returns {*}
 */
const Card2 = ({ testimonial }: Props) => {
    return (
        <Card
            shadow={false}
            className="mt-8 bg-gray-100/50 text-center rounded-2xl p-6">
            <CardHeader color="transparent" floated={false} shadow={false}>
                <Typography
                    color="blue-gray"
                    className="mb-4 !text-2xl lg:!text-3xl max-w-4xl !leading-snug mx-auto font-bold">
                    &quot;{testimonial.quote}&quot;
                </Typography>
            </CardHeader>
            <CardBody className="items-center mx-auto py-2">
                <Avatar
                    src={testimonial.photo}
                    alt={testimonial.author}
                    size="lg"
                    className="mb-4"
                />
                <Typography variant="h6" color="blue-gray">
                    {testimonial.author}
                </Typography>
                <Typography
                    variant="paragraph"
                    className="font-normal !text-gray-500">
                    {testimonial.title}
                </Typography>
            </CardBody>
        </Card>
    );
};

export default Card2;
