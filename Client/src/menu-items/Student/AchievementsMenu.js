// assets
import { IconDashboard, IconDeviceAnalytics, IconSpeakerphone, IconLayoutGridAdd, IconCirclePlus, IconEye, IconSportBillard, IconBellRinging, IconCup, IconArtboard, IconTrophy } from '@tabler/icons';

// constant
const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,
    IconEye,
    IconSpeakerphone,
    IconLayoutGridAdd,
    IconCirclePlus, IconArtboard,
    IconSportBillard, IconBellRinging, IconCup, IconTrophy

};

export const AchievementsMenu = {
    id: 'AchievementsMenu',
    title: '',
    type: 'group',
    children: [
        {
            id: 'icons',
            title: 'Achievements',
            type: 'collapse',
            icon: icons['IconTrophy'],
            children: [{
                id: 'student_internships',
                title: 'Internships',
                type: 'item',
                url: '/_student/achievements/add_internship',
                icon: icons['IconArtboard'],
                breadcrumbs: false
            },
            // {
            //     id: 'subscribed_announcements',
            //     title: 'Applied Announcements',
            //     type: 'item',
            //     url: '/_student/announcement/view_subscribed_announcement',
            //     icon: icons['IconBellRinging'],
            //     breadcrumbs: false
            // },
        ]
            
    }
    ]
};