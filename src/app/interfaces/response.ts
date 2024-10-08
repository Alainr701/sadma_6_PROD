export interface ResponseI {
    status: boolean;
    message: string;
    data: any;
}

export const RESPONSE_ERROR_SERVER: ResponseI = {
    status: false,
    message: 'Error en el servidor',
    data:  null
};
