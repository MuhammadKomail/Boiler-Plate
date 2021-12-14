import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useLocation } from "react-router";
import {
    auth,
    onAuthStateChanged,
    signOut,
    ref,
    db,
    child,
    get
} from '../firebase/firebase'
import { Layout } from 'antd';

// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import useState from 'react'

const settings = ['Logout'];

// const { SubMenu } = Menu;
// import Button from ''
// const { Title } = Typography;
// const { Header, Footer, Sider, Content } = Layout;



export default function Dashboard() {

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [data, setData] = React.useState([]);
    // const [data, setData] = useState([])

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigation = useNavigate();
    const location = useLocation();
    
    // const refrence = ref(db, `/users /${loginData.uid}`)
    // console.log(location.state.firstName)
    const logOut = () => {
        signOut(auth)
            .then((success) => { console.log(success) })
            .catch((err) => { console.log(err) })
    }
    const dbRef = ref(db);


    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                get(child(dbRef, `users /${uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
                        setData(snapshot.val())
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                navigation('/signup')
            }
        }


        );
    }, [])
    return (
        <>
            <h1>{data.firstName}</h1>

            <Layout>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={data.firstName} src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                            {/* <Typography textAlign="center">{setting}</Typography> */}
                                            <Button onClick={logOut} type="primary">Logout</Button>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Layout>
                    {/* <Sider style={{ backgroundColor: "red", alignItems: "center", textAlign: "center" }}>
                        <Menu
                            // onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                                <Menu.ItemGroup key="g1" title="Item 1">
                                    <Menu.Item key="1">Option 1</Menu.Item>
                                    <Menu.Item key="2">Option 2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="g2" title="Item 2">
                                    <Menu.Item key="3">Option 3</Menu.Item>
                                    <Menu.Item key="4">Option 4</Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider> */}
                    <Layout>
                        {/* <Content style={{ alignItems: "center", textAlign: "center" }}>Content</Content> */}
                    </Layout>
                </Layout>
                <Layout>
                    {/* <Footer s
                    tyle={{ alignItems: "center", textAlign: "center" }}>Footer</Footer> */}
                </Layout>
            </Layout>




            {/* <Button onClick={logOut} className="btn btn-primary">Logout</Button> */}

            {/* <Button onClick={logOut} type="primary">Logout</Button> */}

        </>
    )
}


