import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'
import { useSelector } from 'react-redux'

export const AppSidebarNav = ({ items }) => {
    const modules = useSelector((state) => state?.user?.moduleData)

    const navLink = (name, icon, badge, indent = false) => {
        return (
            <>
                {icon
                    ? icon
                    : indent && (
                        <span className="nav-icon">
                            <span className="nav-icon-bullet"></span>
                        </span>
                    )}
                {name && name}
                {badge && (
                    <CBadge color={badge.color} className="ms-auto">
                        {badge.text}
                    </CBadge>
                )}
            </>
        )
    }

    const navItem = (item, index, indent = false) => {
        const { component, name, badge, icon, ...rest } = item
        const Component = component
        return (
            <Component as="div" key={index}>
                {rest.to || rest.href ? (
                    <CNavLink {...(rest.to && { as: NavLink })} {...rest}>
                        {navLink(name, icon, badge, indent)}
                    </CNavLink>
                ) : (
                    navLink(name, icon, badge, indent)
                )}
            </Component>
        )
    }

    const navGroup = (item, index) => {
        const { component, name, icon, items, to, ...rest } = item
        const Component = component
        return (
            <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
                {item.items?.map((item, index) =>
                    item.items ? navGroup(item, index) : navItem(item, index, true),
                )}
            </Component>
        )
    }

    return (
        <CSidebarNav as={SimpleBar}>
            {items?.map((menu, index) => {
                switch (menu.type) {
                    case 'collapse':
                        const filteredItems = menu?.items?.filter((childMenu) => {
                            let getReadAccess = modules?.find((item) => item?.name === childMenu?.module)
                            return getReadAccess && getReadAccess.permissions?.read_access
                        })

                        if (filteredItems?.length > 0) {
                            return navGroup({ ...menu, items: filteredItems }, index)
                        }
                        return null // Return null if no items with read_access

                    case 'item':
                        let getReadAccess = modules?.find((item) => item?.name === menu?.module)
                        if (getReadAccess && getReadAccess.permissions?.read_access) {
                            return navItem(menu, index)
                        }
                        return null // Return null if no read_access

                    default:
                        return <div>Menu Items Error</div>
                }
            })}
        </CSidebarNav>
    )
}

AppSidebarNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
