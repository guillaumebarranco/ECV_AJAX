import facebook

# pip install virtualenv
# pip install requests
# git clone https://github.com/pythonforfacebook/facebook-sdk.git

CONST_MSG = "Hello Word from Python page !!"
CONST_CFG = {
    "page_id"      : "1732502050359300",  # Step 1
    "access_token" : "CAACEdEose0cBACtH0476SHCCgOyZAsr5bK1me13cdkeUv8PQugbuexAPXPhIKE5m84euTrJ41jhrQmbetks9ZBiSaHb6Y2O7q4xLXvJATABAMwXaEXrJHT2YGXCeadRWYlMFSLiZCNX6RScabAn6Ioeyl2XRWcJ46hZBBGniumf25GZBcRvS6zZBMZAn2sDgvEIXN0OC85cb1OOf5icUycQ8"   # Step 3
}

def main():
    api = get_api(CONST_CFG)
    api.put_wall_post(CONST_MSG)

def get_api(cfg):
    graph = facebook.GraphAPI(cfg['access_token'])
    return graph

if __name__ == "__main__": main()
