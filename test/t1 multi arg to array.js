
var print = console.log;
var cfg_KeepTabs = true;
var remove = !(cfg_KeepTabs);

function collect_base(...queryTabsResult) {
	// body...
	print([...queryTabsResult])
}
  

print(remove)
  collect_base(1,2,3)