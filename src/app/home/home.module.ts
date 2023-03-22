import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { RoutingHomeModule } from './routing-home.module';
import { SpinnerInterceptorComponent } from '../service/spinner-interceptor/spinner-interceptor.component';
import { EducationComponent } from './education/education.component';
import { FormEducationComponent } from './education/form-education/form-education.component';
import { FormSkillComponent } from './skills/form-skill/form-skill.component';
import { SkillsComponent } from './skills/skills.component';
import { FormSoftSkillComponent } from './soft-skills/form-soft-skill/form-soft-skill.component';
import { SoftSkillsComponent } from './soft-skills/soft-skills.component';
import { FormUserExpComponent } from './user-exp/form-user-exp/form-user-exp.component';
import { UserExpComponent } from './user-exp/user-exp.component';
import { TagsComponent } from './education/tags/tags.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SpinnerInterceptorComponent,
    SkillsComponent,
    TagsComponent,
    SoftSkillsComponent,
    UserExpComponent,
    EducationComponent,
    FormEducationComponent,
    FormSkillComponent,
    FormSoftSkillComponent,
    FormUserExpComponent,
  ],
  imports: [CommonModule, RoutingHomeModule],
})
export class HomeModule {}
