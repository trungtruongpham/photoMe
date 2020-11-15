import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef;

  private observer: IntersectionObserver;


  constructor(private host: ElementRef) { }

  ngOnInit(): void {
    // console.log('oninit');

    // const options = {
    //   root: null,
    //   ... this.options
    // };
    // console.log(options);


    // this.observer = new IntersectionObserver(([entry]) => {
    //   // tslint:disable-next-line:no-unused-expression
    //   entry.isIntersecting && this.scrolled.emit();
    // }, options);

    // this.observer.observe(this.anchor.nativeElement);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    const options = {
      root: null,
      ... this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      // tslint:disable-next-line:no-unused-expression
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  // tslint:disable-next-line:typedef
  get element() {
    return this.host.nativeElement;
  }

  // tslint:disable-next-line:typedef
  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }
}
