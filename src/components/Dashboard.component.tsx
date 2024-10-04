// // ./components/DashboardComponent.tsx
// import React, { useEffect, useState } from 'react';
// import { Box, H3, DatePicker, Card, Text, Flex } from '@adminjs/design-system';

// const DashboardComponent = () => {
//     const [userStats, setUserStats] = useState({
//         totalUsers: 1200,
//         activeUsers: 300,
//         newUsers: 50,
//     });
//     const [postStats, setPostStats] = useState({
//         totalPosts: 450,
//         postsThisMonth: 30,
//         likesThisMonth: 1200,
//     });
//     const [engagementData, setEngagementData] = useState([
//         { date: '2024-10-01', engagement: 50 },
//         { date: '2024-10-02', engagement: 70 },
//         { date: '2024-10-03', engagement: 90 },
//     ]);
//     const [dateRange, setDateRange] = useState([new Date(), new Date()]);

//     useEffect(() => {
//         // In a real application, fetchStatistics would be called here.
//         // For now, we are using static data.
//     }, [dateRange]);

//     return (
//         <Box padding="xl">
//             <Flex justifyContent="space-between" marginBottom="xl">
//                 <DatePicker
//                     selected={dateRange}
//                     onChange={(dates) => setDateRange(dates)}
//                     selectsRange
//                     inline
//                 />
//             </Flex>

//             <Flex justifyContent="space-between" flexWrap="wrap">
//                 <Card padding="lg" marginBottom="lg" width="30%">
//                     <H3>User Statistics</H3>
//                     <Text>Total Users: {userStats.totalUsers}</Text>
//                     <Text>Active Users: {userStats.activeUsers}</Text>
//                     <Text>New Users This Month: {userStats.newUsers}</Text>
//                 </Card>

//                 <Card padding="lg" marginBottom="lg" width="30%">
//                     <H3>Post Statistics</H3>
//                     <Text>Total Posts: {postStats.totalPosts}</Text>
//                     <Text>Posts This Month: {postStats.postsThisMonth}</Text>
//                     <Text>Likes This Month: {postStats.likesThisMonth}</Text>
//                 </Card>

//                 <Card padding="lg" marginBottom="lg" width="30%">
//                     <H3>User Engagement</H3>
//                     {/* Render a simple static graph or chart here */}
//                     <Text>Engagement Data (Last 7 Days):</Text>
//                     {engagementData.map((data) => (
//                         <Text key={data.date}>
//                             {data.date}: {data.engagement} engagements
//                         </Text>
//                     ))}
//                 </Card>
//             </Flex>
//         </Box>
//     );
// };

// export default DashboardComponent;