import { Observable } from 'rxjs';
import { LoginDto, SignUpDto } from './auth.dto';

export interface IAuthService {
  signup(data: SignUpDto): Observable<boolean>;
  login(data: LoginDto): Observable<any>;
}
