export type TestType = "test"

export interface LinkObject {
    name: any
    href: string
    as?: string
    action?: () => void
    component?: JSX.Element
}


export interface UserObject {
    uid: string
    email: string
    username: string
    bio: string
}
