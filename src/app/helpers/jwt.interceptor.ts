import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authetication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.getToken()) {
            const clonedRequest = request.clone({
                headers: request.headers.set(
                    'Authorization', `Bearer ${this.authenticationService.getToken()}`)
            });
            return next.handle(clonedRequest);
        } else {
            return next.handle(request);
        }
    }
}
