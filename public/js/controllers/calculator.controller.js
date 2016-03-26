angular.module('calcApp')
.controller('CalcCtrl',['$scope','toastr',function($scope,toastr){
    var formula = {
      interest: {
          title: 'Interest',
          description: '(Capital * Rate % * Term)/365',
          result: 0,
          isCurrency: true
      },
        interestDates: {
          title: 'Interest (Calendar)',
          description: '(Capital * Rate % * Term)/365',
          result: 0,
          isCurrency: true
      },
        term:{
            title: 'Term',
            description: '(Interest * 365) / (Capital * Rate %)',
            result: 0,
          isCurrency: false
        },
        rate:{
            title: 'Tasa',
            description: '(Interest * 365) / (Capital * Term)',
            result: 0,
          isCurrency: false
        },
        rateDates:{
            title: 'Rate (Calendar)',
            description: '(Interest * 365) / (Capital * Term)',
            result: 0,
          isCurrency: false
        },
        capital:{
            title: 'Capital',
            description: '(Interest * 365) / (Rate % * Term)',
            result: 0 ,
          isCurrency: true
        },
        capitalDates:{
            title: 'Capital (Calendar)',
            description: '(Interest * 365) / (Rate % * Term)',
            result: 0 ,
          isCurrency: true
        }
    };
    
    $scope.resultFlag = false;
    $scope.data = {};
    
    
    $scope.clean = function(){
        $scope.resultFlag = false;
        $scope.resultsData = [];
        $scope.data = {};
    }
    
    $scope.calculate = function(){
        $scope.resultsData = [];
        // Interest
        if(!isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.rate) && !isEmptyObject($scope.data.days)){
            formula.interest.result = cdLib.calculatingInterest($scope.data.capital,$scope.data.rate,$scope.data.days);
            $scope.resultsData.push(formula.interest);
        }
        
        if(!isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.rate) && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.interestDates.result=cdLib.calculatingInterestDates($scope.data.capital,$scope.data.rate,new Date($scope.data.startDate),new Date($scope.data.endDate));
            $scope.resultsData.push(formula.interestDates);
        }
    
        // Term
    
        if(!isEmptyObject($scope.data.interest) && !isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.rate)){
            formula.term.result = cdLib.calculatingTerm($scope.data.interest,$scope.data.capital,$scope.data.rate);
            $scope.resultsData.push(formula.term);
        }
    
        // Rate
        
        if(!isEmptyObject($scope.data.interest) && !isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.days)){
            formula.rate.result = cdLib.calculatingRate($scope.data.interest,$scope.data.capital,$scope.data.days);
            $scope.resultsData.push(formula.rate);
        }
    
        if(!isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.interest) 
               && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.rateDates.result = cdLib.calculatingRateDates($scope.data.interest,$scope.data.capital,$scope.data.startDate,$scope.data.endDate);
            $scope.resultsData.push(formula.rateDates);
        }
                           
        // Capital               
        if(!isEmptyObject($scope.data.interest) && !isEmptyObject($scope.data.rate) && !isEmptyObject($scope.data.days)){
            formula.capital.result = cdLib.calculatingCapital($scope.data.interest,$scope.data.rate,$scope.data.days);
            $scope.resultsData.push(formula.capital);
        }
                           
        if(!isEmptyObject($scope.data.interest) && !isEmptyObject($scope.data.rate) 
               && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.capitalDates.result = cdLib.calculatingCapitalDates($scope.data.interest,$scope.data.rate,$scope.data.startDate,$scope.data.endDate);
            $scope.resultsData.push(formula.capitalDates);
        }
        
        if($scope.resultsData.length > 0){
            toastr.success("Processing!");
            $scope.resultFlag = true;

        }else{
            toastr.error("Insufficient Data");               
        }

    };
    
    function isEmptyObject(item){
        if(typeof item === 'undefined' || item === null || item === ''){
            return true;
        }else{
            return false;
        }
    }
}]);