//
//  Item.swift
//  NextTime
//
//  Created by Shlok Kapoor on 18/09/16.
//  Copyright © 2016 Shlok Kapoor. All rights reserved.
//

import Foundation
import UIKit

class Item {
    
    var taskName = ""
    var detail = ""
    var lastDone = NSDate()
    var nextPrediction = NSDate()
    var history = [NSDate]()
    var image = UIImage()
    
    init()
    {
        
    }
    
    init(name: String,  last: NSDate, history: [NSDate])
    {
        self.taskName = name;
        self.lastDone = last;
        self.history = history;
        
        self.nextPrediction = nextTimePredictor();
    }
    
    init(name: String, detail: String, lastDone: NSDate, image: UIImage)
    {
        self.taskName = name;
        self.lastDone = lastDone;
        self.detail = detail;
        
        self.history = [NSDate]();
        self.history.append(lastDone);
        
        self.image = image;
        
        self.nextPrediction = nextTimePredictor();
    }
    
    func daysBetweenDates(startDate: NSDate, endDate: NSDate) -> Int
    {
        let calendar = NSCalendar.currentCalendar()
        
        let components = calendar.components([.Day], fromDate: startDate, toDate: endDate, options: [])
        
        return components.day
    }
    
    func getDateInLocal(date: NSDate) -> String {
        
        let formatter = NSDateFormatter()
        formatter.dateStyle = NSDateFormatterStyle.MediumStyle
        formatter.timeStyle = .ShortStyle
        
        let defaultTimeZoneStr = formatter.stringFromDate(date)
        
        return defaultTimeZoneStr;
    }
    
    func getDateInLocalWithoutTime(date: NSDate) -> String {
        
        let formatter = NSDateFormatter()
        formatter.dateStyle = NSDateFormatterStyle.MediumStyle
        
        let defaultTimeZoneStr = formatter.stringFromDate(date)
        
        return defaultTimeZoneStr;
    }
    
    func getCount() -> Int{
        return history.count;
    }
    
    func didTask(){
        //Add current date to history
        self.history.append(NSDate())
        
        //Update last done date
        self.lastDone = NSDate()
        
        //Update prediction
        self.nextPrediction = nextTimePredictor();
    }
    
    func nextTimePredictor() -> NSDate {
        
        
        //Need minimum 5 historical occurences for prediction to work
        if(history.count < 5)
        {
            return NSDate();
        }
        
        //1. Get number of days between task dates

        var diffs = Int();
        
        var count = 0;
        
        var tempDate = NSDate();
        
        for item in history
        {
            //If first item, skip diff
            if(count == 0)
            {
                tempDate = item;
            }
            else
            {
                diffs += self.daysBetweenDates(tempDate, endDate: item)
                tempDate = item;
            }
            
            count += 1;
        }
        
        let predicted = diffs / (history.count - 1);
        let input = Double(predicted*60*60*24);
        
        //add to last date of occurence
        let nextDate = history[history.count - 1].dateByAddingTimeInterval(input);
        
        return nextDate;
    }
    
}