
export class ColorDividerService {
  newText: any;
  constructor() { }

  color(t) {
    this.newText = '';
    let nt = t.split(' ');
    for(let i = 0; i < nt.length; i++) {
      if (i == 0) {
        this.newText += nt[i];
      } else {
        this.newText += `<span class="page-1"> ${nt[i]} </span>`;
      }
    }
    return this.newText;
  }
}
