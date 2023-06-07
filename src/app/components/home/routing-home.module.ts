import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from 'src/app/shared.module';
import { EducationComponent } from './education/education.component';
import { FormEducationComponent } from './education/form-education/form-education.component';
import { TagsComponent } from './education/tags/tags.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { FormJobComponent } from './job/form-job/form-job.component';
import { JobComponent } from './job/job.component';
import { FormSkillComponent } from './skills/form-skill/form-skill.component';
import { SkillsComponent } from './skills/skills.component';
import { FormSoftSkillComponent } from './soft-skills/form-soft-skill/form-soft-skill.component';
import { SoftSkillsComponent } from './soft-skills/soft-skills.component';

const routing: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SkillsComponent,
    TagsComponent,
    SoftSkillsComponent,
    EducationComponent,
    FormEducationComponent,
    FormSkillComponent,
    FormSoftSkillComponent,
    JobComponent,
    FormJobComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routing),
    SharedModule,
    NgCircleProgressModule.forRoot({}),
  ],
  exports: [RouterModule],
})
export class RoutingHomeModule {}