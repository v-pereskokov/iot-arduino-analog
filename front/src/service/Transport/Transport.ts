import * as fetch from 'isomorphic-fetch';

class Transport {
  private static instance: Transport;
  private headers: Headers;
  private baseUrl: string;

  constructor() {
    if (Transport.instance) {
      return Transport.instance;
    }

    this.headers = new Headers();
    this.baseUrl = '';

    Transport.instance = this;

    this.setUpHeaders();
  }

  public get(uri: string, timeout: number = 20000) {
    return this._sender(uri, 'GET', timeout);
  }

  public post(uri: string, data?: object, timeout: number = 20000) {
    return this._sender(uri, 'POST', timeout, JSON.stringify(data));
  }

  private async _sender(uri: string, type: string, timeout: number, data?: string): Promise<Response> {
    const options = {
      method: type,
      mode: 'no-cors',
      body: data,
      timeout,
    };

    return fetch(this.baseUrl + uri, this.setRequest(options));
  }

  private setRequest(options?): object {
    return {
      method: options.method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: options.body,
      credentials: 'same-origin',
      timeout: options.timeout,
    };
  }

  private setUpHeaders() {
    this.headers.append('Content-Type', 'application/json');
  }
}

const transport = new Transport();

export default transport;
