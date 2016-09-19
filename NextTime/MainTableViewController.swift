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
    var selectedItem = Item();
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //Initialize Title
        self.title = "Next Time"
        
        //Navigation bar settings
        navigationController!.navigationBar.backgroundColor = UIColor(red:0.33, green:0.67, blue:0.93, alpha:1.0)
        navigationController!.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName: UIColor.whiteColor()]
        navigationController!.navigationBar.barTintColor = UIColor(red:0.33, green:0.67, blue:0.93, alpha:1.0)
        navigationController!.navigationBar.tintColor = UIColor.whiteColor()
        
        UINavigationBar.appearance().titleTextAttributes = [NSForegroundColorAttributeName:UIColor.whiteColor()]
        
        //populate data
        let date = [NSDate().dateByAddingTimeInterval(Double(-60*60*24)), NSDate()]
        
        var history1 = [NSDate]();
        
        for(var i = 1; i <= 10; i++)
        {
            let nextDate = NSDate().dateByAddingTimeInterval(Double(-i*3*60*60*24));
            history1.insert(nextDate, atIndex: 0);
        }
        
        var history2 = [NSDate]();
        
        for(var i = 1; i <= 10; i++)
        {
            let nextDate = NSDate().dateByAddingTimeInterval(Double(-i*4*60*60*24));
            history2.insert(nextDate, atIndex: 0);
        }
        
        var history3 = [NSDate]();
        
        var nextDate = date[0];
        history3.insert(nextDate, atIndex: 0);
        
        for(var i = 1; i <= 10; i++)
        {
            
            let randomNumber = Int(arc4random_uniform(6) + 1)
            nextDate = nextDate.dateByAddingTimeInterval(Double(-randomNumber*60*60*24));
            history3.insert(nextDate, atIndex: 0);
        }
        
        //NSLog(history);
        
        var item1 = Item(name: "task1", last: date[0], history: history1)
        var item2 = Item(name: "task2", last: date[0], history: history2)
        var item3 = Item(name: "task3", last: date[0], history: history3)
        
        
        items = [item1, item2, item3]
    
        
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
        let item = items[indexPath.row] 

        //Update cell params with details from the item
        cell.taskName.text = item.taskName;
        cell.lastTime.text = item.getDateInLocal(item.lastDone);
        cell.nextTime.text = item.getDateInLocal(item.nextPrediction);
        cell.count.text = String(item.getCount());
        
        //What to do when button tapped
        cell.onButtonTapped = {
            item.didTask();
            
            self.items[indexPath.row] = item;
            self.reloadView()
        }
        
        return cell
    }
    
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        return true
    }
    
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if (editingStyle == UITableViewCellEditingStyle.Delete) {
            // handle delete (by removing the data from your array and updating the tableview)
            
            let refreshAlert = UIAlertController(title: "Delete", message: "Are you sure you want to delete this task?", preferredStyle: UIAlertControllerStyle.ActionSheet)
            
            
            
            refreshAlert.addAction(UIAlertAction(title: "Yes", style: .Default, handler: { (action: UIAlertAction!) in
                self.items.removeAtIndex(indexPath.row)
                tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
            }))
            
            refreshAlert.addAction(UIAlertAction(title: "No", style: .Cancel, handler: { (action: UIAlertAction!) in
            }))
            
            presentViewController(refreshAlert, animated: true, completion: nil)
        }
    }

    @IBAction func addButton(sender: UIBarButtonItem) {
        //performSegueWithIdentifier("addItemSeg", sender: self)
        performSegueWithIdentifier("addTask", sender: self)
    }
    
    func saveItem(item: Item) {
        
        items.insert(item, atIndex : 0)
        self.reloadView()
    }
    
    func editItem(oldTaskName: String, item: Item) {
        
        //Find index of item
        let index = items.indexOf({(i1: Item) -> Bool in
            return i1.taskName == oldTaskName
        })
        
        //Remove it and insert new item
        items.removeAtIndex(index!);
        items.insert(item, atIndex : index!)

        self.reloadView()
    }
    
    func reloadView(){
        self.tableView.reloadData();
    }
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "addTask" {
            
            let secondViewController = segue.destinationViewController as! AddViewController
            secondViewController.parentViewControllerLol = self
        }
        
        if segue.identifier == "showDetails" {
            
            let secondViewController = segue.destinationViewController as! ShowDetailViewController
            secondViewController.item = self.selectedItem
            secondViewController.parentViewControl = self
        }
    }
    
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        
        let item = items[indexPath.row]
        self.selectedItem = item;
        
        performSegueWithIdentifier("showDetails", sender: self)
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
