import {Container, Tabs} from "@mantine/core";
import TopUsersPage from "./pages/TopUsersPage.tsx";
import VideosPage from "./pages/VideosPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {useState} from "react";




function App() {
    const [tab,setTab] = useState<string | null >("home");

    return (
       <Container w={"100%"} h={"100vh"} pt ="md" >
           <Tabs value={tab} onChange={(value) => setTab(value)}>
               <Tabs.List>
                   <Tabs.Tab value="home">Top Uživatel</Tabs.Tab>
                   <Tabs.Tab value="videos">Videa</Tabs.Tab>
                   <Tabs.Tab value="login">Login</Tabs.Tab>
               </Tabs.List>
               <Tabs.Panel value="videos"><VideosPage/></Tabs.Panel>
               <Tabs.Panel value="home"><TopUsersPage/></Tabs.Panel>
               <Tabs.Panel value="login"><LoginPage/></Tabs.Panel>
           </Tabs>
       </Container>
    );
}
export default App
