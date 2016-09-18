//
//  Item.swift
//  NextTime
//
//  Created by Shlok Kapoor on 18/09/16.
//  Copyright © 2016 Shlok Kapoor. All rights reserved.
//

import Foundation


struct Time
{
        
}


class Item {
    
    var taskName = ""
    var lastDone = NSDate()
    var nextPrediction = NSDate()
    var history = [NSDate]()
    
    init( name: String,  last: NSDate, next: NSDate, history: [NSDate])
    {
        self.taskName = name;
        self.lastDone = last;
        self.nextPrediction = next;
        self.history = history;
    }
    
    func daysBetweenDates(startDate: NSDate, endDate: NSDate) -> Int
    {
        let calendar = NSCalendar.currentCalendar()
        
        let components = calendar.components([.Day], fromDate: startDate, toDate: endDate, options: [])
        
        return components.day
    }
    
    func nextTimePredictor() -> NSDate {
        
        //1. Get number of days between task dates
        
        if(history.count < 5)
        {
            return NSDate();
        }
        
        var diffs = Int();//= [Double]();
        
        var count = 0;
        
        var tempDate = NSDate();
        
        for item in history
        {
            if(count == 0)
            {
                tempDate = item;
            }
            else
            {
            //diffs.append(item.timeIntervalSinceDate(tempDate));
            diffs += self.daysBetweenDates(tempDate, endDate: item)
            tempDate = item;
            }
            
            count += 1;
        }
        
        var predicted = diffs / (history.count - 1);
        var input = Double(predicted*60*60*24);// as! Double;
        
        let nextDate = history[history.count - 1].dateByAddingTimeInterval(input);
        
        
        
        return nextDate;
    }
    
}