// الملف: src/app/components/skills/skills.ts

import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills implements AfterViewInit, OnDestroy {
  @ViewChildren('skillBar') skillBars!: QueryList<ElementRef<HTMLElement>>;
  
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.initObserver();
  }

  private initObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // هنشتغل لما 50% من العنصر يظهر
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const bar = entry.target as HTMLElement;
        const finalWidth = bar.getAttribute('data-final-width');

        // لو العنصر بقى ظاهر في الشاشة
        if (entry.isIntersecting) {
          if (finalWidth) {
            bar.style.width = finalWidth; // شغل الأنيميشن
          }
        } else {
          // لو العنصر خرج من الشاشة
          bar.style.width = '0%'; // رجعه للصفر تاني
        }
      });
    }, options);

    // خلي الـ observer يراقب كل الـ skill bars
    this.skillBars.forEach(bar => {
      this.observer?.observe(bar.nativeElement);
    });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}