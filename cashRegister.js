function checkCashRegister(price, cash, cid) {


    let cashUnits = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER",0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ]
    let cidClone = JSON.parse(JSON.stringify(cid));
    let amountDue = cash - price
    let amountInDrawer = findAmountInDrawer(cidClone)
    let changeDue = calculateChangeDue(cidClone, amountDue, cashUnits)
    let newAmountInDrawer = findAmountInDrawer(cidClone)
    console.log(amountInDrawer)
    console.log(changeDue)
    if (amountInDrawer < amountDue || changeDue == 'cantFindChange') {
      return {
        status: "INSUFFICIENT_FUNDS",
        change: []
      }
  
    } else if (newAmountInDrawer == 0) {
      return{
        status: "CLOSED",
        change: cid}
    } else {
      console.log('{status: "OPEN", change: ' + changeDue + '}')
      return {status: "OPEN", change: changeDue }

    }
  
  function findAmountInDrawer(cashInDrawer) {
    let totalCash = 0;
    cashInDrawer.forEach(c => {
      totalCash += c[1]
    })
    return totalCash.toFixed(2);
  }
  
  function calculateChangeDue(cashInDrawer, amountDue, cashUnits) {
    let runningTotal = amountDue.toFixed(2);
    let change = []
    while (runningTotal != 0) {
     
      let largest = findlargestFitting(cashInDrawer, runningTotal, cashUnits)
      if (largest == "not found"){
        return "cantFindChange"
      }
      runningTotal -= largest[1]
      addChangeToChange(change, largest)
      subtractLargestFromCashInDrawer(cashInDrawer, largest)
      runningTotal = runningTotal.toFixed(2)

  
    }
    return change
  }
  
  function subtractLargestFromCashInDrawer(cashInDrawer, largest) {
    let CashToBeSubtractedFrom = cashInDrawer.find(c=> c[0] == largest[0])
    CashToBeSubtractedFrom[1] -= largest[1]
    if (CashToBeSubtractedFrom[1] == 0){
      cashInDrawer.forEach(c => {
        if(CashToBeSubtractedFrom[0]== c[0]){
          let index = cashInDrawer.indexOf(c)
          cashInDrawer.splice(index) 
      }})
    }
    return cashInDrawer
  }

  function addChangeToChange(change, largest) {
     let foundItem1 = change.find(c=> c[0] == largest[0])
      if (foundItem1 != undefined) {

        foundItem1[1] += largest[1]
        
      }
       else {
        let clonedLargest =  [...largest]

        change.push(clonedLargest)
      }
      return change
    }
  
  
  function findlargestFitting(cashInDrawer, amountDue, cashUnits) {
    for (let i = 0; i <= cashUnits.length; i++) {
    for (let r = 0; r < cashInDrawer.length; r++) {
      if (cashUnits[i][0] == cashInDrawer[r][0]){
        if ( cashInDrawer[r][1] != 0){
          if(amountDue - cashUnits[i][1] >= 0){
            return cashUnits[i]
         }
        }
       }
    }
  }
  return "not found"
}
  
  function findAmountInDrawer(cashInDrawer) {
    let totalCash = 0;
    cashInDrawer.forEach(c => {
      totalCash += c[1]
    })
    return totalCash.toFixed(2);
  }
  
}
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])