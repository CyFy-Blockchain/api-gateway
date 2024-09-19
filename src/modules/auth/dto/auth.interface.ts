import { Observable } from 'rxjs';
import { SignUpDto } from './auth.dto';

export interface IAuthService {
  signup(data: SignUpDto): Observable<boolean>;
}
