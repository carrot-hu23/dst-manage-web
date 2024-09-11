import {Container} from "@mui/material";

import ActivePlayerChart from "./ActivePlayerChart";
import UserStatistic from "./UserStatistic";
import RecentPlayers from "./RecentPlayers";

export default () => {

    return (
        <div>
            <Container maxWidth="xxl">
                <UserStatistic />
                <br/>
                <ActivePlayerChart />
                <br/>
                <RecentPlayers />
            </Container>
        </div>
    );
}