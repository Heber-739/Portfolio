import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EducationService } from 'src/app/backend/service/education.service';
import { TagService } from 'src/app/backend/service/tag.service';
import { Tag } from 'src/app/interface/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  @Input() edId!: number;
  tags: Tag[] = [];
  allTags: Tag[] = [];
  matchTags: Tag[] = [];
  showAllTags: boolean = false;
  name = new FormControl('', [Validators.required]);

  constructor(private edService: EducationService, private tagS: TagService) {}

  ngOnInit(): void {
    this.tags = this.tagS.getTags(this.edId);
    this.allTags = this.tagS.getAllTags();
    this.name.valueChanges.subscribe((e) => {
      if (e.length >= 2) {
        this.showAllTags = true;
        this.tagsShow(e);
      } else if (e.length < 2) this.showAllTags = false;
    });
  }

  add() {
    let tag: Tag = {
      name: this.name.value,
    };
    this.tagS.createTag(tag);
    this.name.reset();
  }
  tagsShow(name: string) {
    this.matchTags = this.allTags.filter((i) =>
      i.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  tagSelect(tag: Tag) {
    let t: Tag = this.tagS.addTagToEducation(tag.id!, this.edId);
    this.tags.push(t);
  }
  deleteTag(tag: Tag) {
    this.tagS.removeTagToEducation(tag.id!, this.edId);
    this.tags = this.tags.filter((x) => x.id != tag.id);
  }
}
