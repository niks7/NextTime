//
//  MainTableViewController.swift
//  NextTime
//
//  Created by Shlok Kapoor on 18/09/16.
//  Copyright © 2016 Shlok Kapoor. All rights reserved.
//

import UIKit

class MainTableViewController: UITableViewController {

    var items = [Item]();
    
    override func viewDidLoad() {
        super.viewDidLoad()

        let date = [NSDate(), NSDate()]
        
        
        var history1 = [NSDate]();
        
        for(var i = 1; i <= 10; i++)
        {
            let nextDate = NSDate().dateByAddingTimeInterval(Double(i*3*60*60*24));
            history1.append(nextDate);
        }
        
        var history2 = [NSDate]();
        
        for(var i = 1; i <= 10; i++)
        {
            let nextDate = NSDate().dateByAddingTimeInterval(Double(i*4*60*60*24));
            history2.append(nextDate);
        }
        
        var history3 = [NSDate]();
        var nextDate = NSDate();
        
        for(var i = 1; i <= 10; i++)
        {
            
            let randomNumber = Int(arc4random_uniform(6) + 1)
            nextDate = nextDate.dateByAddingTimeInterval(Double(randomNumber*60*60*24));
            history3.append(nextDate);
        }
        
        //NSLog(history);
        
        var item1 = Item(name: "task1", last: date[0], next: date[1], history: history1)
        var item2 = Item(name: "task2", last: date[0], next: date[1], history: history2)
        var item3 = Item(name: "task3", last: date[0], next: date[1], history: history3)
        
        //var nextDate = item1.nextTimePredictor()
        
        items = [item1, item2, item3]
        
    }
    
    func addItem()
    {
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items.count
    }

    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("item", forIndexPath: indexPath) as! ItemView
        
        var item = items[indexPath.row] as! Item
        
        
        cell.taskName.text = item.taskName;
        cell.lastTime.text = item.lastDone.description;
        cell.nextTime.text = item.nextTimePredictor().description;
        
        
        return cell
    }
    

    @IBAction func addButton(sender: UIBarButtonItem) {
        performSegueWithIdentifier("addItemSeg", sender: self)
        
        
        
    }
    
    func saveItem(item: Item) {
        
        items.insert(item, atIndex : 0)
        self.tableView.reloadData();
    
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "addItemSeg" {
            
            let secondViewController = segue.destinationViewController as! NewTaskViewController
            secondViewController.parentViewControllerLol = self
        }
    }
    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
