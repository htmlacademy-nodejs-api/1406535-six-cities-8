import { getMongoURI } from '../../shared/helpers/database.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../../shared/libs/database-client/mongo.database-client.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv.file-reader.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { Logger } from '../../shared/libs/logger/logger.interface.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { Offer } from '../../shared/types/index.js';
import { Command } from './command.interface.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = '123456';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      userId: user.id,
      title: offer.title,
      description: offer.description,
      preview: offer.preview,
      images: offer.images,
      price: offer.price,
      facilities: offer.facilities,
      type: offer.type,
      city: offer.city,
      isPremium: offer.isPremium,
      rooms: offer.rooms,
      guests: offer.guests,
      location: offer.location
    });

  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public getName(): string {
    return '--import';
  }

  public async execute(fileName: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const tsvFileReader = new TSVFileReader(fileName.trim());
    tsvFileReader.on('line', this.onImportedOffer);
    tsvFileReader.on('end', this.onCompleteImport);

    try {
      tsvFileReader.read();
    } catch (err: unknown) {
      console.error(`Can't import data from file: ${fileName}.`);

      if (err instanceof Error) {
        console.error(`Details: ${err.message}`);
      }
    }
  }
}
