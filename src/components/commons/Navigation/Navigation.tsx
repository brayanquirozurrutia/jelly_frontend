import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useMediaQuery } from 'react-responsive';

const Navigation = () => {
    const isDesktop = useMediaQuery({ minWidth: 1020 });

    if (!isDesktop) {
        return null;
    }
    return (
        <nav className="bg-white border-t border-b border-slate-400 p-4">
            <div className="container mx-auto flex justify-center">
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton
                                className="px-4 text-gray-800 hover:text-black focus:outline-none hover:underline hover:decoration-purple2 hover:underline-offset-2">
                                Home
                            </MenuButton>
                        </Menu>
                    </li>
                    <span className="border-r border-slate-400 h-6"></span>
                    <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton
                                className="px-4 text-gray-800 hover:text-black focus:outline-none hover:underline hover:decoration-purple2 hover:underline-offset-2">
                                Home
                            </MenuButton>
                        </Menu>
                    </li>
                    <span className="border-r border-slate-400 h-6"></span>
                    <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton
                                className="px-4 text-gray-800 hover:text-black focus:outline-none hover:underline hover:decoration-purple2 hover:underline-offset-2">
                                Home
                            </MenuButton>
                        </Menu>
                    </li>
                    <span className="border-r border-slate-400 h-6"></span>
                    <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton
                                className="px-4 text-gray-800 hover:text-black focus:outline-none hover:underline hover:decoration-purple2 hover:underline-offset-2">
                                Home
                            </MenuButton>
                        </Menu>
                    </li>
                    <span className="border-r border-slate-400 h-6"></span>
                    <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton
                                className="px-4 text-gray-800 hover:text-black focus:outline-none hover:underline hover:decoration-purple2 hover:underline-offset-2 flex items-center group">
                <span className="flex items-center">
                  About
                  <FontAwesomeIcon icon={faCaretDown} className="ml-2 text-purple1 group-hover:text-purple2"/>
                </span>
                            </MenuButton>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems
                                    className="absolute mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    <div className="py-1">
                                        <MenuItem>
                                            {({focus}) => (
                                                <a
                                                    href="#"
                                                    className={`${
                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm`}
                                                >
                                                    Our Team
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({focus}) => (
                                                <a
                                                    href="#"
                                                    className={`${
                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm`}
                                                >
                                                    Our Story
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({focus}) => (
                                                <Menu as="div" className="relative inline-block text-left">
                                                    <MenuButton className={`${
                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } px-4 py-2 text-sm flex justify-between items-center`}>
                                                        More Info
                                                        <FontAwesomeIcon icon={faCaretRight}
                                                                         className="ml-2 text-purple1"/>
                                                    </MenuButton>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <MenuItems
                                                            className="absolute left-full top-0 mt-2 w-56 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <div className="py-1">
                                                                <MenuItem>
                                                                    {({focus}) => (
                                                                        <a
                                                                            href="#"
                                                                            className={`${
                                                                                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                            } block px-4 py-2 text-sm`}
                                                                        >
                                                                            Mission
                                                                        </a>
                                                                    )}
                                                                </MenuItem>
                                                                <MenuItem>
                                                                    {({focus}) => (
                                                                        <a
                                                                            href="#"
                                                                            className={`${
                                                                                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                            } block px-4 py-2 text-sm`}
                                                                        >
                                                                            Vision
                                                                        </a>
                                                                    )}
                                                                </MenuItem>
                                                                <MenuItem>
                                                                    {({focus}) => (
                                                                        <Menu as="div"
                                                                              className="relative inline-block text-left">
                                                                            <MenuButton className={`${
                                                                                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                            } px-4 py-2 text-sm flex justify-between items-center`}>
                                                                                Even More
                                                                                <FontAwesomeIcon icon={faCaretRight}
                                                                                                 className="ml-2 text-purple1"/>
                                                                            </MenuButton>
                                                                            <Transition
                                                                                as={Fragment}
                                                                                enter="transition ease-out duration-100"
                                                                                enterFrom="transform opacity-0 scale-95"
                                                                                enterTo="transform opacity-100 scale-100"
                                                                                leave="transition ease-in duration-75"
                                                                                leaveFrom="transform opacity-100 scale-100"
                                                                                leaveTo="transform opacity-0 scale-95"
                                                                            >
                                                                                <MenuItems
                                                                                    className="absolute left-full top-0 mt-2 w-56 origin-top-left rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                                    <div className="py-1">
                                                                                        <MenuItem>
                                                                                            {({focus}) => (
                                                                                                <a
                                                                                                    href="#"
                                                                                                    className={`${
                                                                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                                                    } block px-4 py-2 text-sm`}
                                                                                                >
                                                                                                    Goal
                                                                                                </a>
                                                                                            )}
                                                                                        </MenuItem>
                                                                                        <MenuItem>
                                                                                            {({focus}) => (
                                                                                                <a
                                                                                                    href="#"
                                                                                                    className={`${
                                                                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                                                    } block px-4 py-2 text-sm`}
                                                                                                >
                                                                                                    Objective
                                                                                                </a>
                                                                                            )}
                                                                                        </MenuItem>
                                                                                    </div>
                                                                                </MenuItems>
                                                                            </Transition>
                                                                        </Menu>
                                                                    )}
                                                                </MenuItem>
                                                            </div>
                                                        </MenuItems>
                                                    </Transition>
                                                </Menu>
                                            )}
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </li>
                    <span className="border-r border-slate-400 h-6"></span>
                    <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton
                                className="px-4 text-gray-800 hover:text-black focus:outline-none hover:underline hover:decoration-purple2 hover:underline-offset-2 flex items-center group">
                                <span className="flex items-center">
                                    Services
                                    <FontAwesomeIcon icon={faCaretDown}
                                                     className="ml-2 text-purple1 group-hover:text-purple2"/>
                                </span>
                            </MenuButton>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems
                                    className="absolute mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <MenuItem>
                                            {({focus}) => (
                                                <a
                                                    href="#"
                                                    className={`${
                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm`}
                                                >
                                                    Consulting
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({focus}) => (
                                                <a
                                                    href="#"
                                                    className={`${
                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm`}
                                                >
                                                    Development
                                                </a>
                                            )}
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </li>
                    <span className="border-r border-slate-400 h-6"></span>
                    <li>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton
                                className="px-4 text-gray-800 hover:text-black focus:outline-none hover:underline hover:decoration-purple2 hover:underline-offset-2 flex items-center group">
                <span className="flex items-center">
                  Contact
                  <FontAwesomeIcon icon={faCaretDown} className="ml-2 text-purple1 group-hover:text-purple2"/>
                </span>
                            </MenuButton>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems
                                    className="absolute mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <MenuItem>
                                            {({focus}) => (
                                                <a
                                                    href="#"
                                                    className={`${
                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm`}
                                                >
                                                    Email
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({focus}) => (
                                                <a
                                                    href="#"
                                                    className={`${
                                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm`}
                                                >
                                                    Phone
                                                </a>
                                            )}
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
