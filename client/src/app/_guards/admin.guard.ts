import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  
  if (accountService.roles().includes('Admin') || accountService.roles().includes('Moderator')) {
    return true;
  } else {
    toastr.error('You canot enter this area');
    return false;
  }
};
