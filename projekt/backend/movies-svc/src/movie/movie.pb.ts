/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'movie';

export interface CreateMovieRequest {
  name: string;
  genre: string;
  rate: number;
}

export interface CreateMovieResponse {
  status: number;
  error: string[];
  id: number;
}

export interface FindOneData {
  id: number;
  name: string;
  genre: string;
  rate: number;
}

export interface FindOneRequest {
  id: number;
}

export interface FindOneResponse {
  status: number;
  error: string[];
  data: FindOneData | undefined;
}

export interface RateMovieRequest {
  id: number;
  userId: number;
  rate: number;
}

export interface RateMovieResponse {
  status: number;
  error: string[];
}

export const MOVIE_PACKAGE_NAME = 'movie';

export interface MovieServiceClient {
  createMovie(request: CreateMovieRequest): Observable<CreateMovieResponse>;

  findOne(request: FindOneRequest): Observable<FindOneResponse>;

  rateMovie(request: RateMovieRequest): Observable<RateMovieResponse>;
}

export interface MovieServiceController {
  createMovie(
    request: CreateMovieRequest,
  ):
    | Promise<CreateMovieResponse>
    | Observable<CreateMovieResponse>
    | CreateMovieResponse;

  findOne(
    request: FindOneRequest,
  ): Promise<FindOneResponse> | Observable<FindOneResponse> | FindOneResponse;

  rateMovie(
    request: RateMovieRequest,
  ):
    | Promise<RateMovieResponse>
    | Observable<RateMovieResponse>
    | RateMovieResponse;
}

export function MovieServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createMovie', 'findOne', 'rateMovie'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MovieService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('MovieService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MOVIE_SERVICE_NAME = 'MovieService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
