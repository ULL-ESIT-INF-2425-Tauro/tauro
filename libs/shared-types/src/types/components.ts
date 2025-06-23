export type TestComponentProps = {
    text: string
}

export type PageProps = {
    id: string,
    name: string,
    components: CMSComponentData<Record<string, unknown>>[]
}

export type CMSComponentData<T> = {
    id: string;
    name: string;
    key: string;
    props: T;
}

export type Component1Props = {
    text: string
}