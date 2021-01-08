 
tabs = [1,2,3,4]

    // tabs = tabs.map(function (tab) {

    //   if (0) {
    //     return false;
    //   }
    //   return 2;
    // });
    // tabs = tabs.filter(function (tab) {

    //   if (tab%2==0) {
    //     return null;
    //   }
    //   return 4;
    // });
    tabs = tabs.map(function (tab) {

      if (tab%2==0) {
        return null;
      }
      return 4;
    });

    var print = console.log;

    print(tabs)