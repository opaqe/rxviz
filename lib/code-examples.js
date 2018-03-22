export default {
  basics: {
    name: 'Basics',
    code: `const showAll = (...streams) =>
  Rx.Observable.of(...streams
    .map((x, i) => x.startWith(\`#\${i+1}\`)));

showAll(
  // #1
  Rx.Observable.of(1).delay(1000).repeat(4),
  // #2
  Rx.Observable.interval(1000).take(4),
  // #3
  Rx.Observable.of(1).delay(1000).repeat(4).scan((x, y) => x + y, -1),
  // #4
  Rx.Observable.interval(500)
    .filter(x => x % 2 === 1)
    .take(4),
  Rx.Observable.interval(1000)
    .map(x => x * 2)
    .take(4)
);

Rx.Observable.of(1).delay(1000).repeat(4);`,
    timeWindow: 5000
  },
  'hello-world': {
    name: 'Hello, World!',
    code: `// Implement the following with Rx.Observable.create:
// const producer = () => Rx.Observable.interval(300);
const producer = () => Rx.Observable.create(observer => {
  // setInterval(...);
})

const msg = 'Hello, World!';
// Implement the following with Rx.Observable.create:
// const consumer$ = producer().map(...).takeWhile(...);
const consumer$ = Rx.Observable.create(observer => {
  // producer().subscribe(...);
});

// Rx.observable.interval(300).takeUntil(...).map(...);
consumer$`,
    solution: `// Implement the following with Rx.Observable.create:
// const producer = () => Rx.Observable.interval(300);
const producer = () => Rx.Observable.create(observer => {
  let i = 0;
  setInterval(() => {
    observer.next(i);
    i += 1;
  }, 300);
})

const msg = 'Hello, World!';
// Implement the following with Rx.Observable.create:
// const consumer$ = producer().takeUntil(...).map(...);
const consumer$ = Rx.Observable.create(observer => {
  producer().subscribe(x => {
    if (msg[x]) {
      observer.next(msg[x]);
    } else {
      observer.complete();
    }
  });
});

// Rx.observable.interval(300).takeUntil(...).map(...);
consumer$`,
    timeWindow: 5000
  },
  'from-event': {
    name: 'fromEvent',
    code: `const input = document.createElement('input');

input.setAttribute('placeholder', 'Type something');

/*
  \`output\` represents the right hand pane.
  You can prepend/append elements to it.
 */
output.prepend(input);

input.focus();

Rx.Observable
  .fromEvent(input, 'keydown')
  .map(e => e.key)
  .filter(key => key !== ' ');
`,
    timeWindow: 20000
  },
  'ui-state': {
    name: 'Stateless UI',
    code: `const input = document.createElement('input');

input.setAttribute('placeholder', 'Type something');

/*
  \`output\` represents the right hand pane.
  You can prepend/append elements to it.
 */
output.prepend(input);

input.focus();

Rx.Observable
  .fromEvent(input, 'keydown')
  .map(e => e.key)
  .filter(key => key !== ' ');
`,
    timeWindow: 20000
  }
  //'random-error': {
  //name: 'Random error',
  //code: `Rx.Observable
  //.create(observer => {
  //let n = 1;

  //const intervalId = setInterval(() => {
  //if (Math.random() < 0.8 && n < 9) {
  //observer.next(n * n);
  //n += 1;
  //} else {
  //observer.error('Oh no...');
  //}
  //}, 1000);

  //return () => clearInterval(intervalId);
  //})
  //`,
  //timeWindow: 10000
  //},
  //'chess-game': {
  //name: 'Chess game',
  //code: `const timer$ = Rx.Observable.interval(1000);
  //const pieces$ = Rx.Observable.of('', '♞', '', '♞', '♘', '♞');
  //const columns$ = Rx.Observable.of('e', 'c', 'g', 'd', 'e', 'f');
  //const rows$ = Rx.Observable.of('4', '6', '4', '4', '2', '3');

  //Rx.Observable.zip(
  //timer$,
  //pieces$,
  //columns$,
  //rows$,
  //(_, piece, column, row) => \`\${piece}\${column}\${row}\`
  //)
  //`,
  //timeWindow: 7000
  //},
  //'higher-order-observable': {
  //name: 'Higher order Observable',
  //code: `Rx.Observable
  //.interval(1000)
  //.groupBy(n => n % 2)
  //`,
  //timeWindow: 10000
  //},
  //'grouped-fibonacci': {
  //name: 'Grouped Fibonacci',
  //code: `Rx.Observable
  //.interval(1000)
  //.scan(({ secondLast, last }) => ({
  //secondLast: last,
  //last: last + secondLast,
  //}), { secondLast: 0, last: 1 })
  //.pluck('secondLast')
  //.groupBy(n => Math.floor(Math.log10(n)))
  //`,
  //timeWindow: 15000
  //},
  //'today-is': {
  //name: 'Today is...',
  //code: `const sentence = new Date().toString().toUpperCase();
  //const words = sentence.split(' ');
  //const delay = 1000;

  //const wordDelay = i =>
  //i === 0
  //? delay
  //: (words[i - 1].length + 1) * delay;

  //const wordStart = i =>
  //i < words.length
  //? Rx.Observable
  //.of(i)
  //.delay(wordDelay(i))
  //: Rx.Observable
  //.empty()
  //.delay(wordDelay(i));

  //const wordObservable = word => {
  //const letters = word.split('');

  //return Rx.Observable
  //.interval(delay)
  //.take(letters.length)
  //.map(i => letters[i]);
  //};

  //Rx.Observable
  //.range(0, words.length + 1)
  //.concatMap(wordStart)
  //.map(i => wordObservable(words[i]))
  //`,
  //timeWindow: 17000
  //},
  //'custom-operator': {
  //name: 'Custom operator',
  //code: `const sqrt = source$ => Rx.Observable.create(observer =>
  //source$.subscribe(
  //value => {
  //const result = Math.sqrt(value);
  //if (typeof value !== 'number' || isNaN(result)) {
  //observer.error(\`Square root of \${value} doesn't exist\`);
  //} else {
  //observer.next(result);
  //}
  //},
  //err => observer.error(err),
  //() => observer.complete()
  //)
  //);

  //Rx.Observable
  //.interval(1000)
  //.pipe(sqrt)
  //`,
  //timeWindow: 12000
  //},
  //'mouse-move': {
  //name: 'Mouse move',
  //code: `Rx.Observable
  //.fromEvent(document, 'mousemove')
  //.map(event => event.clientX)
  //.throttleTime(300)

  //// Move your mouse over the right hand pane
  //// after clicking Visualize.
  //`,
  //timeWindow: 10000
  //},
  //'pause-and-resume': {
  //name: 'Pause and resume',
  //code: `const pauseResume$ = Rx.Observable
  //.fromEvent(document, 'click')
  //.scan(acc => !acc, true)
  //.startWith(true);

  //const counter$ = Rx.Observable.timer(0, 1000);

  //const empty$ = Rx.Observable.empty();

  //pauseResume$
  //.switchMap(resume => resume ? counter$ : empty$)

  //// Click to pause and resume over the right hand pane
  //// after clicking Visualize.
  //`,
  //timeWindow: 20000
  //},
  //custom: {
  //name: 'Custom',
  //code: `[>
  //Write any JavaScript you want, just make sure that
  //the last expression is an Rx.Observable
  //*/
  //`,
  //timeWindow: 10000
  //}
};
