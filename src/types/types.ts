export interface Book {
    id: number;
    image: {
        url: string;
    };
    title: string;
    rating: number;
    description: string;
    bookingData: string | null;
    authors: string[];
    issueYear: string;
    pages: number;
    cover: string;
    format: string;
    genre: string;
    weight: string;
    isbn: string;
    producer: string;
    publishedYear: number;
    images: string[];
    isReserved: boolean;
    categories: string[];
    booking: {
        id: number;
        order: boolean;
        dateOrder: string;
        customerId: number;
        customerFirstName: string;
        customerLastName: string;
    };
    delivery: {
        id: number;
        handed: boolean;
        dateHandedFrom: string;
        dateHandedTo: string;
        recipientId: number;
        recipientFirstName: string;
        recipientLastName: string;
    };
}

export interface Images {
    url: string
}

export interface Menu {
    id: number;
    path: string;
    name: string;
    count: number;
}
export interface Coments {
    id: number,
    rating: number,
    text: string,
    createdAt: string,
    user: {
        commentUserId: number,
        firstName: string,
        lastName: string,
        avatarUrl: null | string
    }
}
export interface User {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}

export interface Reviews {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    date: string;
    rating: number;
    review: string | null;
}



export interface Page {

    id: number,
    title: string,
    rating: number,
    issueYear: string,
    description: string,
    publish: string,
    pages: string,
    cover: string,
    weight: string,
    format: string,
    ISBN: string,
    producer: string,
    authors: [],
    images: [],
    categories: string | [],
    comments: [],
    delivery: {
        dateHandedTo: string
    }
    booking: {
        customerId: number,
        order: boolean,
        id:string
    }

}

export interface States {
    acardion: {
        acardionSet: boolean
    },
    books: {
        book: [Book] & Book,
        error: boolean,
        loading: boolean,
        success: boolean
    },
    burger: {
        burgerSet: boolean
    },
    categories: {
        categories: [Menu],
        error: boolean,
        loading: boolean,
        success: boolean
    },
    page: {
        page: Page,
        error: boolean,
        loading: boolean,
        success: boolean
    },
    user: {
        user: {
            jwt: string,
            user: {
                blocked: boolean,
                confirmed: boolean,
                createdAt: string,
                email: string,
                firstName: string,
                id: number,
                lastName: string,
                phone: string,
                provider: string,
                updatedAt: string,
                username: string
            }
        },
        error: boolean,
        loading: boolean,
        success: boolean,
        bodyError: {
            code: string,
            config: {},
            message: string,
            name: string,
            request: {},
            response: {
                config: {},
                data: {},
                headers: {},
                request: {},
                status: number,
                statusText: string
            },
            stack: string
        }
    }
    newUser: {
        user: {
            jwt: string,
            user: {
                blocked: boolean,
                confirmed: boolean,
                createdAt: string,
                email: string,
                firstName: string,
                id: number,
                lastName: string,
                phone: string,
                provider: string,
                updatedAt: string,
                username: string
            }
        },
        error: boolean,
        loading: boolean,
        success: boolean,
        bodyError: {
            code: string,
            config: {},
            message: string,
            name: string,
            request: {},
            response: {
                config: {},
                data: {},
                headers: {},
                request: {},
                status: number,
                statusText: string
            },
            stack: string
        }
    },
    forgot: {
        status: {

            ok: boolean

        },
        error: boolean,
        loading: boolean,
        success: boolean
    },
    reset: {
        status: {
            jwt: string,
            user: {
                blocked: boolean,
                confirmed: boolean,
                createdAt: string,
                email: string,
                firstName: string,
                id: number,
                lastName: string,
                phone: string,
                provider: string,
                updatedAt: string,
                username: string
            }
        },
        error: boolean,
        loading: boolean,
        success: boolean
    },
    modal: {
        modalSet: boolean,

    },
    rate: {
        rate: number
    },
    rev: {
        rev: [],
        error: boolean,
        loading: boolean,
        success: boolean,
        bodyError: []
    },
    booking: {
        booking: [],
        err: boolean
        loading: boolean,
        suc: boolean,
        bodyError: []
    },
    deleteBook: {
        bookingDelete: [],
        errorDel: boolean,
        loadingDel: boolean,
        sucDel: boolean,
        bodyError: []
    },
    updateBook: {
        bookingUpdate: {
            data:[]
        },
        loadingPut: false,
        errorPut: false,
        sucPut: false,
        bodyError: []

    }

}


export type MainBookDTO = {
    issueYear?: number;
    rating?: number;
    title: string;
    authors?: string[];
    image?: Images;
    categories?: string[];
    id: number;
    booking?: {
        id: number;
        order: boolean;
        dateOrder?: string;
        customerId?: number;
        customerFirstName?: string;
        customerLastName?: string;
    };
    delivery?: {
        id: number;
        handed: boolean;
        dateHandedFrom?: string;
        dateHandedTo?: string;
        recipientId?: number;
        recipientFirstName?: string;
        recipientLastName?: string;
    };
    histories?: Array<{
        id?: number;
        userId?: number;
    }>;
};
export type CommentDTO = {
    id: number;
    rating: number;
    text?: string;
    createdAt: string;
    user: {
        commentUserId: number;
        firstName: string;
        lastName: string;
        avatarUrl?: string;
    };
};

export type FullBookDTO = {
    id: number;
    categories: string[];
    title: string;
    images: Images[];
    authors: string[];
    description: string;
    rating: number;
    publish?: string;
    issueYear?: number;
    pages?: number;
    cover?: string;
    format?: string;
    weight?: string;
    ISBN?: string;
    producer?: string;
    comments: CommentDTO[];
    booking?: {
        id: number;
        order: boolean;
        dateOrder?: string;
        customerId?: number;
        customerFirstName?: string;
        customerLastName?: string;
    };
    delivery?: {
        id: number;
        handed: boolean;
        dateHandedFrom?: string;
        dateHandedTo?: string;
        recipientId?: number;
        recipientFirstName?: string;
        recipientLastName?: string;
    };
    histories?: Array<{
        id?: number;
        userId?: number;
    }>;
};