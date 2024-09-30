import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {

  @Input() appHasRole: string[] = [];
  private accountService = inject(AccountService);
  private viewContainerRef = inject(ViewContainerRef);
  private temlateRef = inject(TemplateRef);

  ngOnInit(): void {
    if (this.accountService.roles()?.some((r: string) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.temlateRef)
    } else {
      this.viewContainerRef.clear();
    }
  }
}
