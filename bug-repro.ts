import { Observable, Subscription, timer, fromEvent } from 'rxjs';
import { map, tap, startWith } from 'rxjs/operators';

function observeInnerText(elt: HTMLElement | string, observable: Observable<any>) {
  let e: HTMLElement;
  if (typeof (elt) === 'string') {
    const r = document.querySelector(elt);
    if (r === null) {
      throw new Error(`Selector failed: ${elt}`);
    }
    e = r as HTMLElement;
  }
  else {
    e = elt;
  }

  return observable.subscribe({
    next: (v) => e.innerText = JSON.stringify(v, null, ' ')
  });
}

/**
 * Creates a deep copy of the visual viewport
 * at a given state
 */
const copyVisualViewport = (visualViewport: VisualViewport): any => {
  return {
    timeStamp: performance.now(),
    width: visualViewport.width,
    height: visualViewport.height,
    offsetTop: visualViewport.offsetTop,
    offsetLeft: visualViewport.offsetLeft,
    pageTop: visualViewport.pageTop,
    pageLeft: visualViewport.pageLeft,
    scale: visualViewport.scale
  };
};


const innerHeight$ = timer(100, 500)
  .pipe(
    map(() => window.innerHeight)
  );
observeInnerText('#innerHeight', innerHeight$);

const vpTimer$ = timer(100, 500)
  .pipe(
    map(() => copyVisualViewport(window.visualViewport))
  );
observeInnerText('#vpTimer', vpTimer$);

const vpResize$ = fromEvent(window.visualViewport, 'resize')
  .pipe(
    map(() => copyVisualViewport(window.visualViewport))
  );
observeInnerText('#vpResize', vpResize$);
