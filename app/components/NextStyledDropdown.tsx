import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface LinkObject {
    name: string | JSX.Element
    href: string
    as?: string | undefined
    action?: () => void
    hover?: boolean
}

type OpenSide = "left" | "right"

interface Props {
    href?: string
    parentButtonContent: string | JSX.Element
    items: LinkObject[] | undefined
    parentButtonHeight: number
    parentButtonWidth: number
    parentButtonStyle: any
    parentButtonHoverStyle: any
    openSide: OpenSide
    childButtonWidth: number
    childButtonHeight: number
    childButtonStyle: any
    childHoverButtonStyle: any

}

const NextStyledDropdown = (props: Props) => {

    const { parentButtonContent, items, parentButtonHeight, parentButtonWidth, parentButtonStyle, parentButtonHoverStyle, openSide, childButtonHeight, childButtonWidth, childButtonStyle, childHoverButtonStyle } = props

    const [changeItems, setChangeItems] = useState()
    const [hovering, setHovering] = useState(false)

    useEffect(() => {

        var newItems = [...items]
        for (let index = 0; index < newItems.length; index++) {
            const element = newItems[index];
            element.hover = false
        }

        setChangeItems(newItems)


    }, [items])


    function updateHoverStatus(index: number, hover: boolean) {

        let newItems = [...changeItems]
        newItems[index].hover = hover

        setChangeItems(newItems)



    }

    function returnHoverStatus(index) {
        return changeItems[index].hover
    }


    return (
        <div style={{ position: 'relative', height: parentButtonHeight, width: "auto", }}>

            <style jsx>
                {`
                .parentButtonContainer {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    height: ${parentButtonHeight};
                    width: ${parentButtonWidth};
                }

                .parentButton {
                 
                    align-items:center;
                    display:flex;
                  
                    ${parentButtonStyle}
                    ${hovering ? parentButtonHoverStyle : undefined}
                }

                .parentButton:hover {
                    ${parentButtonHoverStyle}
                }

                .childButton {
                    ${childButtonStyle}
                }

                .childButton:hover {
                    ${childHoverButtonStyle}
                }

                @media (hover: hover) {
                    .parentButtonContainer:hover {
                        height:${(childButtonHeight * items.length) + parentButtonHeight} ;
                    }
                  }
                `}
            </style>

            <div
                onMouseOver={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="parentButtonContainer"

            >
                <Link href={items.length === 0 ? props.href : ""}>

                    <a
                        className="parentButton"

                        onTouchStart={() => setHovering(!hovering)}>


                        {parentButtonContent}
                    </a>
                </Link>


                {items && hovering &&

                    //Child items

                    <div style={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.2)", width: "auto", position: 'absolute', marginTop: parentButtonHeight, background: 'white', transform: openSide === "right" ? `translateX(-${childButtonWidth - parentButtonWidth}px)` : "", }}>

                        {items.map((item, index) => {

                            if (item.href.includes("https://")) {

                                console.log('href:', item.href)

                                return (

                                    <a
                                        key={index}
                                        href={item.href}
                                        target="_blank"
                                        className="childButton">

                                        {item.name}
                                    </a>

                                )
                            }
                            else return (
                                <Link href={item.href} as={item.as ? item.as : undefined}>
                                    <a
                                        className="childButton"
                                        key={index}
                                        onMouseOver={() => updateHoverStatus(index, true)}
                                        onMouseLeave={() => updateHoverStatus(index, false)}
                                        onClick={() => {
                                            setHovering(false)
                                            updateHoverStatus(index, false)

                                        }
                                        }

                                    >
                                        {item.name}
                                    </a>
                                </Link>
                            )
                        })}

                    </div>



                }




            </div>
        </div>
    )
}

export default NextStyledDropdown