import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TagService } from 'src/app/backend/service/tag.service';
import { Education } from 'src/app/interface/education';
import { Tag } from 'src/app/interface/tag';
import { ImageCompressService } from 'src/app/service/image-compress.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  @Input() ed!: Education;
  tags = this.ed.tags ?? [];
  allTags: Tag[] = [];
  matchTags: Tag[] = [];
  showAllTags: boolean = false;
  image!: string;
  name = new FormControl('', [Validators.required]);

  constructor(
    private tagS: TagService,
    private imageService: ImageCompressService
  ) {}

  ngOnInit(): void {
    this.allTags = this.tagS.getAllTags();
    this.name.valueChanges.subscribe((e) => {
      if (e.length >= 2) {
        this.showAllTags = true;
        this.tagsShow(e);
      } else if (e.length < 2) this.showAllTags = false;
    });
  }

  add() {
    let tag: Tag = new Tag(this.name.value, this.image);
    this.tags.push(this.tagS.createTag(tag));
    this.name.reset();
    this.image = '';
  }
  loadImage() {
    this.imageService.compress().then((res) => (this.image = res));
  }

  tagsShow(name: string) {
    this.matchTags = this.allTags.filter((i) =>
      i.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  tagSelect(tag: Tag) {
    let t: Tag = this.tagS.addTagToEducation(tag.id!, this.ed.id!);
    this.tags.push(t);
  }
  deleteTag(tag: Tag) {
    this.tagS.removeTagToEducation(tag.id!, this.ed.id!);
    this.tags = this.tags.filter((x) => x.id != tag.id);
  }
}
