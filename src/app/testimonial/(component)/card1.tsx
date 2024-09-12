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
 * ANCHOR  Card 1
 * @date 9/12/2024 - 5:54:21 PM
 *
 * @param {Props} { testimonial }
 * @returns {*}
 */
const Card1 = ({ testimonial }: Props) => {
    return (
        <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6">
            <CardHeader color="transparent" floated={false} shadow={false}>
                <Typography
                    color="blue-gray"
                    className="lg:mb-20 mb-4 text-2xl font-bold">
                    &quot;{testimonial.quote}&quot;
                </Typography>
            </CardHeader>
            <CardBody className="px-4 py-0 flex flex-row items-center gap-x-4 md:gap-x-6 justify-between">
                <div className="flex-1">
                    <Typography variant="h6" color="blue-gray">
                        {testimonial.author}
                    </Typography>
                    <Typography
                        variant="paragraph"
                        className="font-normal !text-gray-500">
                        {testimonial.title}
                    </Typography>
                </div>
                <Avatar
                    src={testimonial.photo}
                    alt={testimonial.author}
                    size="lg"
                />
            </CardBody>
        </Card>
    );
};

export default Card1;
