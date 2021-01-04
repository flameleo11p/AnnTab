var print = console.log;


var arr = [1,2,3]
arr["xxx"] = 123


arr.map((...v)=>{
  print(222, ...v)
})

var tabs = arr

tabs["hidden"] = true
tabs["hidden"] = false
tabs["hidden"] = null
// tabs["hidden"] = undefined

    if (tabs["hidden"]) {
      print(3333333333333) 
    }

print(111, arr)
print(arr["xxx"])