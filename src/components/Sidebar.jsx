import { Avatar, Divider, Icon, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logonew.png";
import { IoHomeOutline, IoHome, IoBookmarks, IoBookmarksOutline, IoPencil, IoPencilOutline, IoBook, IoBookOutline } from 'react-icons/io5'
import { RiQuillPenFill, RiQuillPenLine } from 'react-icons/ri'
// import { useSelector } from 'react-redux';
import "../styles/sidebar.css"

const Sidebar = ({ user }) => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");


    return (
        <div className='sidebar'>
            <Link className="brandContainer" to="/">
                <img src={logo} alt="" />
            </Link>
            <div className='sidebav__nav'>
                {
                    splitLocation[1] === '' ? (
                        <Link to="/">
                            <Tooltip label='Home' hasArrow placement='auto'>
                                <Text fontSize="2xl" color="blackAlpha.900" >
                                    <IoHome />
                                </Text>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Link to="/">
                            <Tooltip label='Home' hasArrow placement='auto'>
                                <Text fontSize="2xl" color="blackAlpha.700">
                                    <IoHomeOutline />
                                </Text>
                            </Tooltip>
                        </Link>

                    )
                }
                {
                    splitLocation[1] === 'saved-posts' ? (
                        <Link to="/saved-posts">
                            <Tooltip label='List' hasArrow placement='auto'>
                                <Text fontSize="2xl" color="blackAlpha.900">
                                    <IoBookmarks />
                                </Text>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Link to="/saved-posts">
                            <Tooltip label='List' hasArrow placement='auto'>
                                <Text fontSize="2xl" color="blackAlpha.700">
                                    <IoBookmarksOutline />
                                </Text>
                            </Tooltip>
                        </Link>
                    )
                }
                {
                    splitLocation[1] === 'my-blog' ? (
                        <Link to="/my-blog">
                            <Tooltip label='Stories' hasArrow placement='auto'>
                                <Text fontSize="2xl" color="blackAlpha.900">
                                    <IoBook />
                                </Text>
                            </Tooltip>
                        </Link>
                    ) : (
                        <Link to="/my-blog">
                            <Tooltip label='Stories' hasArrow placement='auto'>
                                <Text fontSize="2xl" color="blackAlpha.700">
                                    <IoBookOutline />
                                </Text>
                            </Tooltip>
                        </Link>
                    )
                }
                <Divider />
                {
                    splitLocation[1] === 'write' ? (
                        <Link to="/write">
                            <Tooltip label='Write' hasArrow placement='auto'>
                                <Text fontSize="2xl" color="blackAlpha.900">
                                    <IoPencil />
                                </Text>

                            </Tooltip>
                        </Link>
                    ) : (
                        <Link to="/write">
                            <Tooltip label='Write' hasArrow placement='auto'>
                                <Text fontSize="2xl" color="blackAlpha.700">
                                    <IoPencilOutline />
                                </Text>
                            </Tooltip>
                        </Link>
                    )
                }
            </div>
            <Avatar name={user?.username} src={user?.dpUrl} size="sm" />
        </div >
    )
}

export default Sidebar