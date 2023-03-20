
export type Method = 'GET' | 'POST' | 'PUT' | 'HEAD';

export interface Message {
  status: number
}

export interface RequestMessage extends Message {

}

export interface ResponseMessage extends Message {

}

export interface RequestOptions {
  url: string
  method: Method
}

export type RequestCallback = (error: Error | null, message: ResponseMessage) => void;
