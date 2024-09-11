'use client';

import CogoToast from '@successtar/cogo-toast';
import {
    List as MtList,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
    ListItemSuffix,
    IconButton,
} from '@material-tailwind/react';
import { useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { axios } from '@/service/api.service';

/**
 * ANCHOR List
 * @date 9/12/2024 - 1:04:49 AM
 *
 * @returns {*}
 */
const List = () => {
    /**
     * ANCHOR Fetch
     * @date 9/12/2024 - 1:16:18 AM
     *
     * @async
     * @returns {*}
     */
    const _fetch = async () => {
        try {
            const { data } = await axios.get('/todo/api');

            console.log(data);
        } catch (_) {
            CogoToast.error('Unable to fetch task list.');
        }
    };

    useEffect(() => {
        _fetch();
    }, []);

    return (
        <Card className="w-96">
            <MtList>
                <ListItem>
                    <ListItemPrefix>
                        <Avatar
                            variant="circular"
                            alt="candice"
                            src="https://docs.material-tailwind.com/img/face-1.jpg"
                        />
                    </ListItemPrefix>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Tania Andrew
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal">
                            Software Engineer @ Material Tailwind
                        </Typography>
                    </div>
                    <ListItemSuffix>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            className="rounded-full">
                            <FiTrash2 size={18} />
                        </IconButton>
                    </ListItemSuffix>
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <Avatar
                            variant="circular"
                            alt="alexander"
                            src="https://docs.material-tailwind.com/img/face-2.jpg"
                        />
                    </ListItemPrefix>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Alexander
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal">
                            Backend Developer @ Material Tailwind
                        </Typography>
                    </div>
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <Avatar
                            variant="circular"
                            alt="emma"
                            src="https://docs.material-tailwind.com/img/face-3.jpg"
                        />
                    </ListItemPrefix>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Emma Willever
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal">
                            UI/UX Designer @ Material Tailwind
                        </Typography>
                    </div>
                </ListItem>
            </MtList>
        </Card>
    );
};

export default List;
