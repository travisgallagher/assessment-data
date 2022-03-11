log_file = open("um-server-01.txt") # This is opening the file "um-server-01.txt" and assigning it to a variable called log_file


def sales_reports(log_file): # Creates a function called sales_reports, passing in (log_file) as its parameter
    for line in log_file: # for loop that will run through log_file, and for each line in that file do the funcitionality 
        line = line.rstrip() # This will remove any trailing whitespace
        day = line[0:3] # this line will assign day to everything after index 0 to index 2.
        if day == "Mon":   # If the day is Tuesday, it will print the line, so itll print the information from index 0-2 for tuesdays
            print(line)


sales_reports(log_file) # this is just invoking our function and passing in our log_file
