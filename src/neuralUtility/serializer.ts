/* istanbul ignore file */

export class Serializer 
{

    constructor(maxLength)
    {
      this.maxLengthInput =maxLength;
    }

    private maxLengthInput = -1;


   fixLengths = (data) => {

    for (let i = 0; i < data.length; i++) {
      if (data[i].input.length > this.maxLengthInput) {
        this.maxLengthInput = data[i].input.length;
      }
    }
  
    for (let i = 0; i < data.length; i++) {
      while (data[i].input.length < this.maxLengthInput) {
        data[i].input.push(0);
      }
    }
  
    return data;
  }
  
  encode = d => {
    const newArr = [];
    const restrictedData = d.split('').filter(x => x.charCodeAt(0) <= 1104);
      restrictedData.map(c => {
  
        newArr.push((c.charCodeAt(0) / 1104))
      })
      while (newArr.length < this.maxLengthInput ) {
         newArr.push(0);
      }
  
      newArr.slice(0,this.maxLengthInput)
    return newArr
  }
  
  encodeData = data => {
  
    return data.map( d => {
  
      return {
          input:  this.encode(d.input),
          output: d.output
        }
    })
  }
  
  serialize = data => this.fixLengths(this.encodeData(data))
}



