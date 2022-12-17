from datetime import datetime
import variables
import sqlite3
conn = sqlite3.connect('db.sqlite3')
c = conn.cursor()

def create_table():
    c.execute("CREATE TABLE main_user")
    conn.commit()

def backup():
    now = datetime.now()
    current_time = now.strftime("%H-%M-%S")
    print(current_time)
    b_conn = sqlite3.connect('backup-'+str(current_time)+".sqlite3")
    conn.backup(b_conn)
    b_conn.close()

def insert_data(id,distance,second_id,first_id,tablename):
    c.execute("INSERT INTO " + str(tablename) + " VALUES(?,?,?,?)",(id,distance,second_id,first_id))
    conn.commit()

def drop():
    c.execute('DROP TABLE property_image')
    conn.commit()

def delete():
    c.execute("DELETE FROM property_property WHERE transaction_type='Sell'")
    conn.commit

def add_column():
    c.execute("ALTER TABLE users_agencyadmin ADD is_subscribed bit;")
    conn.commit

data = variables.users

backup()
# add_column()
# drop()
# i = 0
# while i < len(data):
#     insert_data(data[i][0],data[i][1],data[i][2])
#     i = i + 1

id_num = 50
for i in range(len(data)):
    k = i + 2
    for j in range(len(data[i])):
        print("ID: " + str(id_num) + " Distance: " + str(data[i][j]) + " First: " + str(i+2) + " Second: " + str(k+1))
        insert_data(id=id_num,distance=data[i][j],second_id=k+1,first_id=i+2,tablename='main_distance')
        k = k + 1
        id_num = id_num + 1

# for i in range(len(data)):     
#     insert_data(id=l,distance=data[k],second_id=z,first_id=2,tablename='main_distance')
#     j = j + 1
#     k = k + 1
#     z = z + 1
#     l = l + 1
# create_table()
# drop()
# add_column()
c.close()
conn.close()

